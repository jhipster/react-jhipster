/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { TranslatorContext } from './index';

const translation = {
  bar: 'i18n text',
  fooz: 'text {{foo }} this {{bar}}',
  foofoo: 'text {{ foo}} this {{bar}} <b>test</b>',
};

const translationMerge = {
  foodirty: 'text {{ foo }} this {{bar}} <script>execute</script><br/><hr><div>test</div> <a href="test">link</a>',
  'baz.foo': 'dirty key',
  foozfooz: 'jhipster is <strong>awesome</strong>!',
};

describe('TranslateContext', () => {
  beforeEach(() => {
    TranslatorContext.context.translations['en'] = undefined;
  });
  describe('without translations', () => {
    it('should not have translations', () => {
      expect(TranslatorContext.context.translations['en']).toBeUndefined();
    });
  });

  describe('with translation', () => {
    beforeEach(() => {
      TranslatorContext.registerTranslations('en', translation);
    });

    it('should match the translation', () => {
      expect(TranslatorContext.context.translations['en']).toMatchObject(expect.objectContaining(translation));
    });
  });

  describe('with merged translation', () => {
    beforeEach(() => {
      TranslatorContext.registerTranslations('en', translation);
      TranslatorContext.registerTranslations('en', translationMerge);
    });

    it('should match both translations', () => {
      expect(TranslatorContext.context.translations['en']).toMatchObject(expect.objectContaining(translation));
      expect(TranslatorContext.context.translations['en']).toMatchObject(expect.objectContaining(translationMerge));
    });
  });

  describe('with deeep merged translation', () => {
    beforeEach(() => {
      TranslatorContext.registerTranslations('en', { foo: { bar: { baz: 1 } } });
      TranslatorContext.registerTranslations('en', { foo: { bar: { foz: 1 } } });
    });

    it('should match both translations', () => {
      expect(TranslatorContext.context.translations['en'].foo.bar.baz).toBe(1);
      expect(TranslatorContext.context.translations['en'].foo.bar.foz).toBe(1);
    });
  });
});
