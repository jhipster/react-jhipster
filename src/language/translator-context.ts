import merge from 'lodash/merge';

/**
 * Holder for translation content and locale
 */

class TranslatorContext {
  static context = {
    previousLocale: null,
    defaultLocale: null,
    locale: null,
    lastChange: new Date().getTime(),
    translations: {},
    renderInnerTextForMissingKeys: true,
    missingTranslationMsg: 'translation-not-found',
  };

  static change() {
    this.context.lastChange = new Date().getTime();
  }

  static registerTranslations(locale: string, translation: any) {
    if (this.context.translations[locale]) {
      merge(this.context.translations[locale], translation);
    } else {
      this.context.translations[locale] = translation;
    }
    TranslatorContext.change();
  }

  static setDefaultLocale(locale: string) {
    this.context.defaultLocale = locale;
    TranslatorContext.change();
  }

  static setMissingTranslationMsg(msg: string) {
    this.context.missingTranslationMsg = msg;
    TranslatorContext.change();
  }

  static setRenderInnerTextForMissingKeys(flag: boolean) {
    this.context.renderInnerTextForMissingKeys = flag;
    TranslatorContext.change();
  }

  static setLocale(locale: string) {
    this.context.previousLocale = this.context.locale;
    this.context.locale = locale || this.context.defaultLocale;
    TranslatorContext.change();
  }
}

export default TranslatorContext;
