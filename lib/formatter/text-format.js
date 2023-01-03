"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormat = void 0;
const tslib_1 = require("tslib");
/*
 Copyright 2017-2023 the original author or authors from the JHipster project.

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
const react_1 = tslib_1.__importDefault(require("react"));
const numeral_1 = tslib_1.__importDefault(require("numeral"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const translator_context_1 = tslib_1.__importDefault(require("../language/translator-context"));
require("numeral/locales");
/**
 * Formats the given value to specified type like date or number.
 * @param value value to be formatted
 * @param type type of formatting to use ${ITextFormatTypes}
 * @param format optional format to use.
 *    For date type dayjs(https://day.js.org/docs/en/display/format) format is used
 *    For number type NumeralJS (http://numeraljs.com/#format) format is used
 * @param blankOnInvalid optional to output error or blank on null/invalid values
 * @param locale optional locale in which to format value or current locale from TranslatorContext
 */
const TextFormat = ({ value, type, format, blankOnInvalid, locale }) => {
    if (blankOnInvalid) {
        if (!value || !type)
            return null;
    }
    if (!locale) {
        // TODO: find a better way to keep track of *current* locale
        locale = translator_context_1.default.context.locale;
        if (!numeral_1.default.locales[locale]) {
            // if not include, by default as en
            numeral_1.default.locale('en');
        }
        else {
            numeral_1.default.locale(locale);
        }
    }
    if (type === 'date') {
        return react_1.default.createElement("span", null, locale ? (0, dayjs_1.default)(value).locale(locale).format(format) : (0, dayjs_1.default)(value).format(format));
    }
    else if (type === 'number') {
        return react_1.default.createElement("span", null, (0, numeral_1.default)(value).format(format));
    }
    return react_1.default.createElement("span", null, value.toString());
};
exports.TextFormat = TextFormat;
//# sourceMappingURL=text-format.js.map