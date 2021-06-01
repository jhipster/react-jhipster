"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment jsdom
 */
/*
 Copyright 2017-2021 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
var React = require("react");
var react_1 = require("@testing-library/react");
var item_count_1 = require("./item-count");
var language_1 = require("../../language");
describe('JhiItemCountComponent test', function () {
    describe('UI logic tests', function () {
        it('should change the content on page change', function () {
            var rerender = react_1.render(React.createElement(item_count_1.JhiItemCount, { page: 1, itemsPerPage: 10, total: 100 })).rerender;
            expect(react_1.screen.getByText('Showing 1 - 10 of 100 items.')).not.toBeNull();
            rerender(React.createElement(item_count_1.JhiItemCount, { page: 2, itemsPerPage: 10, total: 100 }));
            expect(react_1.screen.getByText('Showing 11 - 20 of 100 items.')).not.toBeNull();
        });
    });
    describe('Translation tests', function () {
        it('should change on language change', function () {
            language_1.TranslatorContext.registerTranslations('en', {
                global: {
                    'item-count': 'Showing {{first}} - {{second}} of {{total}} items.',
                },
            });
            language_1.TranslatorContext.registerTranslations('fr', {
                global: {
                    'item-count': 'Affichage {{first}} - {{second}} de {{total}} items.',
                },
            });
            language_1.TranslatorContext.setLocale('en');
            var mountedWrapper = react_1.render(React.createElement(item_count_1.JhiItemCount, { page: 1, itemsPerPage: 10, total: 100, i18nEnabled: true }));
            expect(mountedWrapper.getByText('Showing 1 - 10 of 100 items.')).not.toBeNull();
            language_1.TranslatorContext.setLocale('fr');
            var mountedWrapperFr = react_1.render(React.createElement(item_count_1.JhiItemCount, { page: 1, itemsPerPage: 10, total: 100, i18nEnabled: true }));
            expect(mountedWrapperFr.getByText('Affichage 1 - 10 de 100 items.')).not.toBeNull();
            // Reset TranslatorContext to default so that other tests pass
            language_1.TranslatorContext.context = __assign(__assign({}, language_1.TranslatorContext.context), { translations: {}, locale: null, previousLocale: null });
        });
    });
});
//# sourceMappingURL=item-count.spec.js.map