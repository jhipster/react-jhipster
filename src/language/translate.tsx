import React, { Fragment } from 'react';
import get from 'lodash/get';
import sanitizeHtml from 'sanitize-html';
import TranslatorContext from './translator-context';

export interface ITranslateProps {
  contentKey: string;
  children?: string | JSX.Element | Array<string | JSX.Element>;
  interpolate?: any;
  component?: string;
}

const REACT_ELEMENT = Symbol.for('react.element');

const isFlattenable = value => {
  const type = typeof value;
  return type === 'string' || type === 'number';
};

const flatten = array => {
  if (array.every(isFlattenable)) {
    return array.join('');
  }
  return array;
};

const toTemplate = string => {
  const expressionRe = /{{\s?\w+\s?}}/g;
  const match = string.match(expressionRe) || [];
  return [string.split(expressionRe), ...match];
};

const normalizeValue = (value, key) => {
  if (value == null || ['boolean', 'string', 'number'].includes(typeof value)) {
    return value;
  }
  if (value.$$typeof === REACT_ELEMENT) {
    return React.cloneElement(value, { key });
  }
};

const isNullOrUndefined = (value: any) => value === null || value === undefined;

/**
 * Adapted from https://github.com/bloodyowl/react-translate
 * licenced under The MIT License (MIT) Copyright (c) 2014 Matthias Le Brun
 */
const render = (string, values) => {
  if (!values || !string) return string;
  const [parts, ...expressions] = toTemplate(string);
  return flatten(
    parts.reduce((acc, item, index, array) => {
      if (index === array.length - 1) {
        return [...acc, item];
      }
      const match = expressions[index] && expressions[index].match(/{{\s?(\w+)\s?}}/);
      const value = match != null ? values[match[1]] : null;
      return [...acc, item, normalizeValue(value, index)];
    }, [])
  );
};

/**
 * Fill the variable allPaths with all possible paths for a given paths
 * @param paths: inits with the classic paths and changes value in the recursive method
 *    ex: ['foo', 'bar1', 'bar2', 'bar3']
 * @param start: helps to store paths
 *    ex: []
 * @param firstCall: uses to detect the first call to this recursive function
 *    ex: true
 * @param originPaths: references the first value of the variable paths
 *    ex: ['foo', 'bar1', 'bar2', 'bar3']
 * @param allPaths: stores all the possibles paths
 *    ex: [] => ... => [ ['foo', 'bar1', 'bar2', 'bar3'], ['foo.bar1', 'bar2', 'bar3']], ['foo.bar1.bar2', 'bar3'], ... ]
 */
const searchAllPaths = (paths, start, firstCall, originPaths, allPaths) => {
  if (firstCall || paths.length < originPaths.length) {
    const clonePaths: string[] = Array.from(paths);
    let acc = '';
    for (let i = 0; i < paths.length; ++i) {
      acc === '' ? (acc = paths[i]) : (acc += `.${paths[i]}`);
      clonePaths.shift();
      allPaths.push(start.concat([acc]).concat(clonePaths));
      searchAllPaths(clonePaths, start.concat([acc]), false, originPaths, allPaths);
    }
  }
};

/**
 * A dirty find to split non standard keys and find data from json
 * @param obj json object
 * @param path path to find
 */
const deepFindDirty = (obj, path) => {
  const paths = path.split('.');
  let current = obj;
  let trad = undefined;
  const HASHTAG = '#';
  const allPaths = [];
  const allPathsWithoutDuplicate = [];
  const originPaths = paths;
  // Fill allPaths possibles
  searchAllPaths(paths, [], true, originPaths, allPaths);
  const setAllPaths = new Set(
    allPaths.map(p => {
      return p.join(HASHTAG);
    })
  );
  // Delete duplicates
  setAllPaths.forEach((v1, v2, values) => {
    return allPathsWithoutDuplicate.push(v2.split(HASHTAG));
  });
  // Test all possibles paths while traduction is not found
  for (let j = 0; j < allPathsWithoutDuplicate.length; ++j) {
    if (trad === undefined) {
      // Test a path
      for (let i = 0; i < allPaths[j].length; ++i) {
        if (current[allPaths[j][i]] === undefined) {
          current = undefined;
          break;
        }
        current = current[allPaths[j][i]];
      }
      if (current !== undefined) {
        // Traduction found
        trad = current;
        break;
      }
    }
    // Search with an other path
    current = obj;
  }
  return trad;
};

const showMissingOrDefault = (key, children) => {
  const renderInnerTextForMissingKeys = TranslatorContext.context.renderInnerTextForMissingKeys;
  if (renderInnerTextForMissingKeys && children && ['string', 'object'].includes(typeof children)) {
    return children;
  }
  return `${TranslatorContext.context.missingTranslationMsg}[${key}]`;
};

const doTranslate = (key, interpolate, children) => {
  const translationData = TranslatorContext.context.translations;
  const currentLocale = TranslatorContext.context.locale || TranslatorContext.context.defaultLocale;
  const data = translationData[currentLocale];

  // If there is no translation data, it means it hasn’t loaded yet, so return no content
  if (!Object.keys(translationData).length) {
    return {
      content: null,
    };
  }

  const preRender = data ? get(data, key) || deepFindDirty(data, key) : null;
  const renderedValue = render(preRender, interpolate);

  const preSanitize = !isNullOrUndefined(renderedValue) ? renderedValue : showMissingOrDefault(key, children);

  if (preSanitize === false || /<[a-z][\s\S]*>/i.test(preSanitize)) {
    // String contains HTML tags. Allow only a super restricted set of tags and attributes
    const preSanitizeArray = Array.isArray(preSanitize) ? preSanitize : [preSanitize];
    const content = preSanitizeArray.map(part =>
      part.$$typeof === REACT_ELEMENT
        ? part
        : sanitizeHtml(part, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'hr'],
            allowedAttributes: {
              a: ['href', 'target'],
            },
          })
    );

    return {
      content,
      html: true,
    };
  }
  return {
    content: preSanitize,
    html: false,
  };
};

/**
 * Translates the given key using provided i18n values
 */
class Translate extends React.Component<ITranslateProps> {
  static defaultProps = {
    component: 'span',
  };

  constructor(props) {
    super(props);
    this.state = { lastChange: null };
  }

  componentDidUpdate() {
    this.setState({ lastChange: TranslatorContext.context.lastChange });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.lastChange !== TranslatorContext.context.lastChange || nextProps.interpolate !== this.props.interpolate;
  }

  render() {
    const { contentKey, interpolate, component, children } = this.props;
    const processed = doTranslate(contentKey, interpolate, children);
    if (processed.html) {
      const contentArray = Array.isArray(processed.content) ? processed.content : [processed.content];
      return contentArray.map((content, i) =>
        content.$$typeof === REACT_ELEMENT
          ? { ...content, key: i }
          : React.createElement(component, { key: i, dangerouslySetInnerHTML: { __html: content } })
      );
    }
    return React.createElement(component, null, processed.content);
  }
}

export const translate = (contentKey: string, interpolate?: any, children?: string) => {
  const translation = doTranslate(contentKey, interpolate, children);

  if (translation.html) {
    const contentArray = Array.isArray(translation.content) ? translation.content : [translation.content];
    const processedContent = contentArray.map((content, i) =>
      content.$$typeof === REACT_ELEMENT
        ? { ...content, key: i }
        : React.createElement('span', { key: i, dangerouslySetInnerHTML: { __html: content } })
    );
    return processedContent.length === 1 ? processedContent[0] : <Fragment>{processedContent}</Fragment>;
  } else {
    return translation.content;
  }
};

export default Translate;
