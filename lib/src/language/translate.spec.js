"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment jsdom
 */
var React = require("react");
var react_1 = require("@testing-library/react");
var index_1 = require("./index");
describe('Translate', function () {
    describe('without translations', function () {
        it('renders nothing when no translations are not loaded', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.bar" })).container;
            expect(container.querySelector('span').innerHTML).toBe('');
        });
    });
    describe('with translation', function () {
        beforeAll(function () {
            index_1.TranslatorContext.registerTranslations('en', {
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
            index_1.TranslatorContext.registerTranslations('fr', {
                foo: {
                    bar: 'i18n text fr',
                    fooz: 'text {{foo}} this {{bar}} fr',
                },
            });
        });
        beforeEach(function () {
            index_1.TranslatorContext.setLocale('en');
        });
        // All tests will go here
        it('renders child content when key is invalid and renderInnerTextForMissingKeys is true', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.baz" }, "def text")).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('def text');
        });
        it('renders key-missing message when child content is null & key is invalid', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.baz" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('translation-not-found[foo.baz]');
        });
        it('renders key-missing message when key is invalid & renderInnerTextForMissingKeys is false', function () {
            index_1.TranslatorContext.setRenderInnerTextForMissingKeys(false);
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.baz" }, "def text")).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('translation-not-found[foo.baz]');
        });
        it('renders key-missing message when key is invalid & interpolate argument given', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.baz", interpolate: { foo: 'FOO', bar: 'BAR' } }, "def text")).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('translation-not-found[foo.baz]');
        });
        it('renders a default span with translated content', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.bar" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('i18n text');
        });
        it('renders a default span with translated content for dirty key 1', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.baz.foo" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('dirty key');
        });
        it('renders a default span with translated content for dirty key 2', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.bar1.bar2.bar3" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('bar123');
        });
        it('renders a default span with translated content for dirty key 3', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.bar4.bar5.bar6" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('bar456');
        });
        it('renders a default span with translated content for dirty key 4', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.bar7.bar8.bar9.bar10.bar11" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('bar7891011');
        });
        it('renders a provided component with translated content', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.bar", component: "h1" })).container;
            var span = container.querySelector('h1');
            expect(span.innerHTML).toBe('i18n text');
        });
        it('renders a provided component with translated & interpolated content', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.fooz", component: "h1", interpolate: { foo: 'FOO', bar: 'BAR' } })).container;
            var span = container.querySelector('h1');
            expect(span.innerHTML).toBe('text FOO this BAR');
        });
        it('renders a provided component with translated & interpolated content with html', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.foofoo", component: "h1", interpolate: { foo: 'FOO', bar: 'BAR' } })).container;
            var span = container.querySelector('h1');
            expect(span.innerHTML).toBe('text FOO this BAR <b>test</b>');
        });
        it('renders a provided component with translated, sanitized & interpolated content', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.foodirty", component: "h1", interpolate: { foo: 'FOO', bar: 'BAR' } })).container;
            var span = container.querySelector('h1');
            expect(span.innerHTML).toBe('text FOO this BAR <br><hr>test <a href="test">link</a>');
        });
        it('renders a default span with translated content with new locale', function () {
            index_1.TranslatorContext.setLocale('fr');
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.bar" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('i18n text fr');
        });
        it('renders a default span with translated content for empty string', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.barfalsy.empty" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('');
        });
        it('renders a default span with translated content for number 0', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.barfalsy.zero" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('0');
        });
        it('renders a default span with translated content for boolean false', function () {
            var container = (0, react_1.render)(React.createElement(index_1.Translate, { contentKey: "foo.barfalsy.false" })).container;
            var span = container.querySelector('span');
            expect(span.innerHTML).toBe('false');
        });
    });
});
describe('translate service', function () {
    beforeEach(function () {
        index_1.TranslatorContext.setLocale('en');
    });
    it('produce translated content', function () {
        var out = (0, index_1.translate)('foo.bar');
        expect(out).toBe('i18n text');
    });
    it('produce translated React component', function () {
        var container = (0, react_1.render)((0, index_1.translate)('foo.foozfooz')).container;
        var span = container.querySelector('span');
        expect(span.innerHTML).toBe('jhipster is <strong>awesome</strong>!');
    });
});
//# sourceMappingURL=translate.spec.js.map