"use strict";
/**
 * Holder for translation content and locale
 */
Object.defineProperty(exports, "__esModule", { value: true });
class TranslatorContext {
    static registerTranslations(locale, translation) {
        this.context.translations = Object.assign(Object.assign({}, this.context.translations), { [locale]: translation });
    }
    static setDefaultLocale(locale) {
        this.context.defaultLocale = locale;
    }
    static setMissingTranslationMsg(msg) {
        this.context.missingTranslationMsg = msg;
    }
    static setRenderInnerTextForMissingKeys(flag) {
        this.context.renderInnerTextForMissingKeys = flag;
    }
    static setLocale(locale) {
        this.context.previousLocale = this.context.locale;
        this.context.locale = locale || this.context.defaultLocale;
    }
}
TranslatorContext.context = {
    previousLocale: null,
    defaultLocale: null,
    locale: null,
    translations: {},
    renderInnerTextForMissingKeys: true,
    missingTranslationMsg: 'translation-not-found'
};
exports.default = TranslatorContext;
//# sourceMappingURL=translator-context.js.map