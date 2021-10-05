"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormat = void 0;
var react_1 = __importDefault(require("react"));
var numeral_1 = __importDefault(require("numeral"));
var dayjs_1 = __importDefault(require("dayjs"));
var translator_context_1 = __importDefault(require("../language/translator-context"));
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
var TextFormat = function (_a) {
    var value = _a.value, type = _a.type, format = _a.format, blankOnInvalid = _a.blankOnInvalid, locale = _a.locale;
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
    else {
        require('dayjs/locale/' + locale + '.js');
    }
    if (type === 'date') {
        return (react_1.default.createElement("span", null, locale
            ? (0, dayjs_1.default)(value)
                .locale(locale)
                .format(format)
            : (0, dayjs_1.default)(value).format(format)));
    }
    else if (type === 'number') {
        return react_1.default.createElement("span", null, (0, numeral_1.default)(value).format(format));
    }
    return react_1.default.createElement("span", null, value);
};
exports.TextFormat = TextFormat;
//# sourceMappingURL=text-format.js.map