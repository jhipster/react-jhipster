"use strict";
/**
 * Holder for translation content and locale
 */
Object.defineProperty(exports, "__esModule", { value: true });
class TranslatorContext {
    static change() {
        this.context.lastChange = new Date();
    }
    static registerTranslations(locale, translation) {
        this.context.translations = Object.assign(Object.assign({}, this.context.translations), { [locale]: translation });
        TranslatorContext.change();
    }
    static setDefaultLocale(locale) {
        this.context.defaultLocale = locale;
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
    lastChange: new Date(),
    translations: {},
    renderInnerTextForMissingKeys: true,
    missingTranslationMsg: 'translation-not-found',
};
exports.default = TranslatorContext;
//# sourceMappingURL=translator-context.js.map