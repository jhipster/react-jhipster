import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { Translate, translate, TranslatorContext } from '../../../react-jhipster';

describe('Translate', () => {
  describe('without translations', () => {
    it('renders nothing when no translations are not loaded', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.bar" />);
      const span = mountedWrapper.find('span');
      expect(span.html()).to.equal('<span></span>');
    });
  });

  describe('with translation', () => {
    before(() => {
      TranslatorContext.registerTranslations('en', {
        foo: {
          bar: 'i18n text',
          fooz: 'text {{foo }} this {{bar}}',
          foofoo: 'text {{ foo}} this {{bar}} <b>test</b>',
          foodirty: 'text {{ foo }} this {{bar}} <script>execute</script><br/><hr><div>test</div> <a href="test">link</a>',
          'baz.foo': 'dirty key',
          foozfooz: 'jhipster is <strong>awesome</strong>!',
          'bar1.bar2': {
            bar3: 'bar123'
          },
          bar4: {
            'bar5.bar6': 'bar456'
          },
          bar7: {
            'bar8.bar9': {
              'bar10.bar11': 'bar7891011'
            }
          }
        }
      });
      TranslatorContext.registerTranslations('fr', {
        foo: {
          bar: 'i18n text fr',
          fooz: 'text {{foo}} this {{bar}} fr'
        }
      });
    });

    beforeEach(() => {
      TranslatorContext.setLocale('en');
    });
    // All tests will go here
    it('renders child content when key is invalid and renderInnerTextForMissingKeys is true', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.baz">def text</Translate>);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>def text</span>');
    });
    it('renders key-missing message when child content is null & key is invalid', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.baz" />);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>translation-not-found[foo.baz]</span>');
    });
    it('renders key-missing message when key is invalid & renderInnerTextForMissingKeys is false', () => {
      TranslatorContext.setRenderInnerTextForMissingKeys(false);
      const mountedWrapper = mount(<Translate contentKey="foo.baz">def text</Translate>);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>translation-not-found[foo.baz]</span>');
      expect(span.text()).to.equal('translation-not-found[foo.baz]');
    });
    it('renders key-missing message when key is invalid & interpolate argument given', () => {
      const mountedWrapper = mount(
        <Translate contentKey="foo.baz" interpolate={{ foo: 'FOO', bar: 'BAR' }}>
          def text
        </Translate>
      );
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>translation-not-found[foo.baz]</span>');
      expect(span.text()).to.equal('translation-not-found[foo.baz]');
    });
    it('renders a default span with translated content', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.bar" />);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>i18n text</span>');
      expect(span.text()).to.equal('i18n text');
    });
    it('renders a default span with translated content for dirty key 1', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.baz.foo" />);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>dirty key</span>');
      expect(span.text()).to.equal('dirty key');
    });
    it('renders a default span with translated content for dirty key 2', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.bar1.bar2.bar3" />);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>bar123</span>');
      expect(span.text()).to.equal('bar123');
    });
    it('renders a default span with translated content for dirty key 3', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.bar4.bar5.bar6" />);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>bar456</span>');
      expect(span.text()).to.equal('bar456');
    });
    it('renders a default span with translated content for dirty key 4', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.bar7.bar8.bar9.bar10.bar11" />);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>bar7891011</span>');
      expect(span.text()).to.equal('bar7891011');
    });
    it('renders a provided componenet with translated content', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.bar" component="h1" />);
      const span = mountedWrapper.find('h1');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<h1>i18n text</h1>');
      expect(span.text()).to.equal('i18n text');
    });
    it('renders a provided componenet with translated & interpolated content', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.fooz" component="h1" interpolate={{ foo: 'FOO', bar: 'BAR' }} />);
      const span = mountedWrapper.find('h1');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<h1>text FOO this BAR</h1>');
      expect(span.text()).to.equal('text FOO this BAR');
    });
    it('renders a provided componenet with translated & interpolated content with html', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.foofoo" component="h1" interpolate={{ foo: 'FOO', bar: 'BAR' }} />);
      const span = mountedWrapper.find('h1');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<h1>text FOO this BAR <b>test</b></h1>');
      expect(span.text()).to.equal('text FOO this BAR test');
    });
    it('renders a provided componenet with translated, sanitized & interpolated content', () => {
      const mountedWrapper = mount(<Translate contentKey="foo.foodirty" component="h1" interpolate={{ foo: 'FOO', bar: 'BAR' }} />);
      const span = mountedWrapper.find('h1');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<h1>text FOO this BAR <br><hr>test <a href="test">link</a></h1>');
      expect(span.text()).to.equal('text FOO this BAR test link');
    });
    it('renders a default span with translated content with new locale', () => {
      TranslatorContext.setLocale('fr');
      const mountedWrapper = mount(<Translate contentKey="foo.bar" />);
      const span = mountedWrapper.find('span');
      expect(span.length).to.equal(1);
      expect(span.html()).to.equal('<span>i18n text fr</span>');
      expect(span.text()).to.equal('i18n text fr');
    });
  });
});

describe('translate service', () => {
  beforeEach(() => {
    TranslatorContext.setLocale('en');
  });

  it('produce translated content', () => {
    const out = translate('foo.bar');
    expect(out).to.equal('i18n text');
  });

  it('produce translated React component', () => {
    const mountedWrapper = mount(translate('foo.foozfooz'));
    const span = mountedWrapper.find('span');
    expect(span.length).to.equal(1);
    expect(mountedWrapper.html()).to.equal('<span>jhipster is <strong>awesome</strong>!</span>');
  });
});
