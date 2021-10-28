/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';

import { Translate, translate, TranslatorContext } from './index';
describe('Translate', () => {
  describe('without translations', () => {
    it('renders nothing when no translations are not loaded', () => {
      const { container } = render(<Translate contentKey="foo.bar" />);
      expect(container.querySelector('span').innerHTML).toBe('');
    });
  });

  describe('with translation', () => {
    beforeAll(() => {
      TranslatorContext.registerTranslations('en', {
        foo: {
          bar: 'i18n text',
          fooz: 'text {{foo }} this {{bar}}',
          foofoo: 'text {{ foo}} this {{bar}} <b>test</b>',
          foodirty: 'text {{ foo }} this {{bar}} <script>execute</script><br/><hr><div>test</div> <a href="test">link</a>',
          'baz.foo': 'dirty key',
          foozfooz: 'jhipster is <strong>awesome</strong>!',
          'bar1.bar2': {
            bar3: 'bar123',
          },
          bar4: {
            'bar5.bar6': 'bar456',
          },
          bar7: {
            'bar8.bar9': {
              'bar10.bar11': 'bar7891011',
            },
          },
          barfalsy: {
            empty: '',
            zero: 0,
            false: false,
          },
        },
      });
      TranslatorContext.registerTranslations('fr', {
        foo: {
          bar: 'i18n text fr',
          fooz: 'text {{foo}} this {{bar}} fr',
        },
      });
    });

    beforeEach(() => {
      TranslatorContext.setLocale('en');
    });
    // All tests will go here
    it('renders child content when key is invalid and renderInnerTextForMissingKeys is true', () => {
      const { container } = render(<Translate contentKey="foo.baz">def text</Translate>);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('def text');
    });
    it('renders key-missing message when child content is null & key is invalid', () => {
      const { container } = render(<Translate contentKey="foo.baz" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('translation-not-found[foo.baz]');
    });
    it('renders key-missing message when key is invalid & renderInnerTextForMissingKeys is false', () => {
      TranslatorContext.setRenderInnerTextForMissingKeys(false);
      const { container } = render(<Translate contentKey="foo.baz">def text</Translate>);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('translation-not-found[foo.baz]');
    });
    it('renders key-missing message when key is invalid & interpolate argument given', () => {
      const { container } = render(
        <Translate contentKey="foo.baz" interpolate={{ foo: 'FOO', bar: 'BAR' }}>
          def text
        </Translate>
      );
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('translation-not-found[foo.baz]');
    });
    it('renders a default span with translated content', () => {
      const { container } = render(<Translate contentKey="foo.bar" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('i18n text');
    });
    it('renders a default span with translated content for dirty key 1', () => {
      const { container } = render(<Translate contentKey="foo.baz.foo" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('dirty key');
    });
    it('renders a default span with translated content for dirty key 2', () => {
      const { container } = render(<Translate contentKey="foo.bar1.bar2.bar3" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('bar123');
    });
    it('renders a default span with translated content for dirty key 3', () => {
      const { container } = render(<Translate contentKey="foo.bar4.bar5.bar6" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('bar456');
    });
    it('renders a default span with translated content for dirty key 4', () => {
      const { container } = render(<Translate contentKey="foo.bar7.bar8.bar9.bar10.bar11" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('bar7891011');
    });
    it('renders a provided component with translated content', () => {
      const { container } = render(<Translate contentKey="foo.bar" component="h1" />);
      const span = container.querySelector('h1');
      expect(span.innerHTML).toBe('i18n text');
    });
    it('renders a provided component with translated & interpolated content', () => {
      const { container } = render(<Translate contentKey="foo.fooz" component="h1" interpolate={{ foo: 'FOO', bar: 'BAR' }} />);
      const span = container.querySelector('h1');
      expect(span.innerHTML).toBe('text FOO this BAR');
    });
    it('renders a provided component with translated & interpolated content with html', () => {
      const { container } = render(<Translate contentKey="foo.foofoo" component="h1" interpolate={{ foo: 'FOO', bar: 'BAR' }} />);
      const span = container.querySelector('h1');
      expect(span.innerHTML).toBe('text FOO this BAR <b>test</b>');
    });
    it('renders a provided component with translated, sanitized & interpolated content', () => {
      const { container } = render(<Translate contentKey="foo.foodirty" component="h1" interpolate={{ foo: 'FOO', bar: 'BAR' }} />);
      const span = container.querySelector('h1');
      expect(span.innerHTML).toBe('text FOO this BAR <br><hr>test <a href="test">link</a>');
    });
    it('renders a default span with translated content with new locale', () => {
      TranslatorContext.setLocale('fr');
      const { container } = render(<Translate contentKey="foo.bar" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('i18n text fr');
    });

    it('renders a default span with translated content for empty string', () => {
      const { container } = render(<Translate contentKey="foo.barfalsy.empty" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('');
    });

    it('renders a default span with translated content for number 0', () => {
      const { container } = render(<Translate contentKey="foo.barfalsy.zero" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('0');
    });

    it('renders a default span with translated content for boolean false', () => {
      const { container } = render(<Translate contentKey="foo.barfalsy.false" />);
      const span = container.querySelector('span');
      expect(span.innerHTML).toBe('false');
    });
  });
});

describe('translate service', () => {
  beforeEach(() => {
    TranslatorContext.setLocale('en');
  });

  it('produce translated content', () => {
    const out = translate('foo.bar');
    expect(out).toBe('i18n text');
  });

  it('produce translated React component', () => {
    const { container } = render(translate('foo.foozfooz'));
    const span = container.querySelector('span');
    expect(span.innerHTML).toBe('jhipster is <strong>awesome</strong>!');
  });
});
