"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserLocale = exports.windowSize = exports.containerSize = void 0;
/**
 * Fetch the specified element by id or return default
 * @param id id of element
 */
var containerSize = function (id) {
    if (id === void 0) { id = 'app-view-container'; }
    return document.getElementById(id) || { offsetHeight: 960, offsetWidth: 960 };
};
exports.containerSize = containerSize;
/**
 * Fetch the current window size
 */
var windowSize = function () { return ({ width: window.innerWidth, height: window.innerHeight }); };
exports.windowSize = windowSize;
/**
 * Get the current browser locale
 */
var browserLocale = function () {
    var lang;
    var nav = navigator;
    if (nav.languages && nav.languages.length) {
        // latest versions of Chrome and Firefox set this correctly
        lang = nav.languages[0];
    }
    else if (nav.userLanguage) {
        // IE only
        lang = nav.userLanguage;
    }
    else {
        // latest versions of Chrome, Firefox, and Safari set this correctly
        lang = nav.language;
    }
    return lang;
};
exports.browserLocale = browserLocale;
//# sourceMappingURL=dom-utils.js.map