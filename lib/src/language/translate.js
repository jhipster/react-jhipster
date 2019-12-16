"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var get = require("lodash.get");
var sanitizeHtml = require("sanitize-html");
var translator_context_1 = require("./translator-context");
var REACT_ELEMENT = Symbol.for('react.element');
var isFlattenable = function (value) {
    var type = typeof value;
    return type === 'string' || type === 'number';
};
var flatten = function (array) {
    if (array.every(isFlattenable)) {
        return array.join('');
    }
    return array;
};
var toTemplate = function (string) {
    var expressionRe = /{{\s?\w+\s?}}/g;
    var match = string.match(expressionRe) || [];
    return [string.split(expressionRe)].concat(match);
};
var normalizeValue = function (value, key) {
    if (value == null || ['boolean', 'string', 'number'].includes(typeof value)) {
        return value;
    }
    if (value.$$typeof === REACT_ELEMENT) {
        return React.cloneElement(value, { key: key });
    }
};
/**
 * Adapted from https://github.com/bloodyowl/react-translate
 * licenced under The MIT License (MIT) Copyright (c) 2014 Matthias Le Brun
 */
var render = function (string, values) {
    if (!values || !string)
        return string;
    var _a = toTemplate(string), parts = _a[0], expressions = _a.slice(1);
    return flatten(parts.reduce(function (acc, item, index, array) {
        if (index === array.length - 1) {
            return acc.concat([item]);
        }
        var match = expressions[index] && expressions[index].match(/{{\s?(\w+)\s?}}/);
        var value = match != null ? values[match[1]] : null;
        return acc.concat([item, normalizeValue(value, index)]);
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
var searchAllPaths = function (paths, start, firstCall, originPaths, allPaths) {
    if (firstCall || paths.length < originPaths.length) {
        var clonePaths = Array.from(paths);
        var acc = '';
        for (var i = 0; i < paths.length; ++i) {
            acc === '' ? (acc = paths[i]) : (acc += "." + paths[i]);
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
var deepFindDirty = function (obj, path) {
    var paths = path.split('.');
    var current = obj;
    var trad = undefined;
    var HASHTAG = '#';
    var allPaths = [];
    var allPathsWithoutDuplicate = [];
    var originPaths = paths;
    // Fill allPaths possibles
    searchAllPaths(paths, [], true, originPaths, allPaths);
    var setAllPaths = new Set(allPaths.map(function (p) {
        return p.join(HASHTAG);
    }));
    // Delete duplicates
    setAllPaths.forEach(function (v1, v2, values) {
        return allPathsWithoutDuplicate.push(v2.split(HASHTAG));
    });
    // Test all possibles paths while traduction is not found
    for (var j = 0; j < allPathsWithoutDuplicate.length; ++j) {
        if (trad === undefined) {
            // Test a path
            for (var i = 0; i < allPaths[j].length; ++i) {
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
var showMissingOrDefault = function (key, children) {
    var renderInnerTextForMissingKeys = translator_context_1.default.context.renderInnerTextForMissingKeys;
    if (renderInnerTextForMissingKeys && children && ['string', 'object'].includes(typeof children)) {
        return children;
    }
    return translator_context_1.default.context.missingTranslationMsg + "[" + key + "]";
};
var doTranslate = function (key, interpolate, children) {
    var translationData = translator_context_1.default.context.translations;
    var currentLocale = translator_context_1.default.context.locale || translator_context_1.default.context.defaultLocale;
    var data = translationData[currentLocale];
    // If there is no translation data, it means it hasn’t loaded yet, so return no content
    if (!Object.keys(translationData).length) {
        return {
            content: null
        };
    }
    var preRender = data ? get(data, key) || deepFindDirty(data, key) : null;
    var preSanitize = render(preRender, interpolate) || showMissingOrDefault(key, children);
    if (/<[a-z][\s\S]*>/i.test(preSanitize)) {
        // String contains HTML tags. Allow only a super restricted set of tags and attributes
        var content = sanitizeHtml(preSanitize, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'hr'],
            allowedAttributes: {
                a: ['href', 'target']
            }
        });
        return {
            content: content,
            html: true
        };
    }
    return {
        content: preSanitize,
        html: false
    };
};
/**
 * Translates the given key using provided i18n values
 */
var Translate = /** @class */ (function (_super) {
    __extends(Translate, _super);
    function Translate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Translate.prototype.shouldComponentUpdate = function () {
        var currentLocale = translator_context_1.default.context.locale || translator_context_1.default.context.defaultLocale;
        var prevLocale = translator_context_1.default.context.previousLocale;
        return currentLocale !== prevLocale;
    };
    Translate.prototype.render = function () {
        var _a = this.props, contentKey = _a.contentKey, interpolate = _a.interpolate, component = _a.component, children = _a.children;
        var processed = doTranslate(contentKey, interpolate, children);
        if (processed.html) {
            return React.createElement(component, { dangerouslySetInnerHTML: { __html: processed.content } });
        }
        return React.createElement(component, null, processed.content);
    };
    Translate.defaultProps = {
        component: 'span'
    };
    return Translate;
}(React.Component));
exports.translate = function (contentKey, interpolate, children) {
    var translation = doTranslate(contentKey, interpolate, children);
    if (translation.html) {
        return React.createElement('span', { dangerouslySetInnerHTML: { __html: translation.content } });
    }
    else {
        return translation.content;
    }
};
exports.default = Translate;
//# sourceMappingURL=translate.js.map