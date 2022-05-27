"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const merge_1 = tslib_1.__importDefault(require("lodash/merge"));
/**
 * Holder for translation content and locale
 */
class TranslatorContext {
    static change() {
        this.context.lastChange = new Date().getTime();
    }
    static registerTranslations(locale, translation) {
        if (this.context.translations[locale]) {
            (0, merge_1.default)(this.context.translations[locale], translation);
        }
        else {
            this.context.translations[locale] = translation;
        }
        TranslatorContext.change();
    }
    static setDefaultLocale(locale) {
        this.context.defaultLocale = locale;
        TranslatorContext.change();
    }
    static setMissingTranslationMsg(msg) {
        this.context.missingTranslationMsg = msg;
        TranslatorContext.change();
    }
    static setRenderInnerTextForMissingKeys(flag) {
        this.context.renderInnerTextForMissingKeys = flag;
        TranslatorContext.change();
    }
    static setLocale(locale) {
        this.context.previousLocale = this.context.locale;
        this.context.locale = locale || this.context.defaultLocale;
        TranslatorContext.change();
    }
}
TranslatorContext.context = {
    previousLocale: null,
    defaultLocale: null,
    locale: null,
    lastChange: new Date().getTime(),
    translations: {},
    renderInnerTextForMissingKeys: true,
    missingTranslationMsg: 'translation-not-found',
};
exports.default = TranslatorContext;
//# sourceMappingURL=translator-context.js.map