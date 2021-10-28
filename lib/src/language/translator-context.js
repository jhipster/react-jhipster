"use strict";
/**
 * Holder for translation content and locale
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TranslatorContext = /** @class */ (function () {
    function TranslatorContext() {
    }
    TranslatorContext.registerTranslations = function (locale, translation) {
        var _a;
        this.context.translations = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, this.context.translations), (_a = {}, _a[locale] = translation, _a));
    };
    TranslatorContext.setDefaultLocale = function (locale) {
        this.context.defaultLocale = locale;
    };
    TranslatorContext.setMissingTranslationMsg = function (msg) {
        this.context.missingTranslationMsg = msg;
    };
    TranslatorContext.setRenderInnerTextForMissingKeys = function (flag) {
        this.context.renderInnerTextForMissingKeys = flag;
    };
    TranslatorContext.setLocale = function (locale) {
        this.context.previousLocale = this.context.locale;
        this.context.locale = locale || this.context.defaultLocale;
        require('dayjs/locale/' + this.context.locale + '.js');
    };
    TranslatorContext.context = {
        previousLocale: null,
        defaultLocale: null,
        locale: null,
        translations: {},
        renderInnerTextForMissingKeys: true,
        missingTranslationMsg: 'translation-not-found'
    };
    return TranslatorContext;
}());
exports.default = TranslatorContext;
//# sourceMappingURL=translator-context.js.map