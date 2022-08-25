"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const get_1 = tslib_1.__importDefault(require("lodash/get"));
const sanitize_html_1 = tslib_1.__importDefault(require("sanitize-html"));
const translator_context_1 = tslib_1.__importDefault(require("./translator-context"));
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
        return react_1.default.cloneElement(value, { key });
    }
};
const isNullOrUndefined = (value) => value === null || value === undefined;
/**
 * Adapted from https://github.com/bloodyowl/react-translate
 * licenced under The MIT License (MIT) Copyright (c) 2014 Matthias Le Brun
 */
const render = (string, values) => {
    if (!values || !string)
        return string;
    const [parts, ...expressions] = toTemplate(string);
    return flatten(parts.reduce((acc, item, index, array) => {
        if (index === array.length - 1) {
            return [...acc, item];
        }
        const match = expressions[index] && expressions[index].match(/{{\s?(\w+)\s?}}/);
        const value = match != null ? values[match[1]] : null;
        return [...acc, item, normalizeValue(value, index)];
    }, []));
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
        const clonePaths = Array.from(paths);
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
    const setAllPaths = new Set(allPaths.map(p => {
        return p.join(HASHTAG);
    }));
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
    const renderInnerTextForMissingKeys = translator_context_1.default.context.renderInnerTextForMissingKeys;
    if (renderInnerTextForMissingKeys && children && ['string', 'object'].includes(typeof children)) {
        return children;
    }
    return `${translator_context_1.default.context.missingTranslationMsg}[${key}]`;
};
const doTranslate = (key, interpolate, children) => {
    const translationData = translator_context_1.default.context.translations;
    const currentLocale = translator_context_1.default.context.locale || translator_context_1.default.context.defaultLocale;
    const data = translationData[currentLocale];
    // If there is no translation data, it means it hasn’t loaded yet, so return no content
    if (!Object.keys(translationData).length) {
        return {
            content: null,
        };
    }
    const preRender = data ? (0, get_1.default)(data, key) || deepFindDirty(data, key) : null;
    const renderedValue = render(preRender, interpolate);
    const preSanitize = !isNullOrUndefined(renderedValue) ? renderedValue : showMissingOrDefault(key, children);
    if (preSanitize === false || /<[a-z][\s\S]*>/i.test(preSanitize)) {
        // String contains HTML tags. Allow only a super restricted set of tags and attributes
        const content = (0, sanitize_html_1.default)(preSanitize, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'hr'],
            allowedAttributes: {
                a: ['href', 'target'],
            },
        });
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
class Translate extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { lastChange: null };
    }
    componentDidUpdate() {
        this.setState({ lastChange: translator_context_1.default.context.lastChange });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.lastChange !== translator_context_1.default.context.lastChange || nextProps.interpolate !== this.props.interpolate;
    }
    render() {
        const { contentKey, interpolate, component, children } = this.props;
        const processed = doTranslate(contentKey, interpolate, children);
        if (processed.html) {
            return react_1.default.createElement(component, { dangerouslySetInnerHTML: { __html: processed.content } });
        }
        return react_1.default.createElement(component, null, processed.content);
    }
}
Translate.defaultProps = {
    component: 'span',
};
const translate = (contentKey, interpolate, children) => {
    const translation = doTranslate(contentKey, interpolate, children);
    if (translation.html) {
        return react_1.default.createElement('span', { dangerouslySetInnerHTML: { __html: translation.content } });
    }
    else {
        return translation.content;
    }
};
exports.translate = translate;
exports.default = Translate;
//# sourceMappingURL=translate.js.map