"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment jsdom
 */
var React = require("react");
var dayjs = require("dayjs");
var react_1 = require("@testing-library/react");
var numeral = require("numeral");
require('numeral/locales'); // load numeral-js locale data
var index_1 = require("./index");
describe('text-format component', function () {
    // All tests will go here
    describe('date format', function () {
        it('Should return Invalid Date in text when value is invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var findByText, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        findByText = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: null, type: "date" })).findByText;
                        _a = expect;
                        return [4 /*yield*/, findByText('Invalid Date')];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).not.toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        it('Should return blank when value is invalid and blankOnInvalid is true', function () {
            var container = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: null, type: "date", blankOnInvalid: true })).container;
            expect(container.firstChild).toBeNull();
        });
        it('Should return default formatted date for valid date', function () {
            var d = new Date();
            var node = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: d, type: "date" }));
            expect(node.findByText(dayjs(d).format())).not.toBeNull();
        });
        it('Should return formatted date for valid date and format', function () {
            var d = new Date();
            var node = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: d, type: "date", format: "DD MM YY" }));
            expect(node.findByText(dayjs(d).format('DD MM YY'))).not.toBeNull();
        });
        describe('using locales and formats', function () {
            var locales = ['en', 'it', 'de', 'fr', 'sk', 'tr', 'vi']; // a sample of locales
            var formats = ['ddd', 'dddd', 'MMM', 'MMMM']; // short and long textual formats of days and months
            locales.forEach(function (locale) {
                formats.forEach(function (format) {
                    it("Should return a valid date formatted with format '" + format + "' in '" + locale + "'", function () {
                        var d = new Date();
                        var node = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: d, type: "date", format: format, locale: locale }));
                        expect(node.findByText(dayjs(d).locale(locale).format(format))).not.toBeNull();
                    });
                });
            });
        });
    });
    describe('number format', function () {
        it('Should return 0 in text when value is invalid', function () {
            var node = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: null, type: "number" }));
            expect(node.findByText('0')).not.toBeNull();
        });
        it('Should return blank when value is invalid and blankOnInvalid is true', function () {
            var container = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: null, type: "number", blankOnInvalid: true })).container;
            expect(container.firstChild).toBeNull();
        });
        it('Should return default formatted number for valid number', function () {
            var n = 100000;
            var node = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: n, type: "number" }));
            expect(node.findByText('100,000')).not.toBeNull();
        });
        it('Should return formatted number for valid number and format', function () {
            var n = 100000.1234;
            var node = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: n, type: "number", format: "0,0.00" }));
            expect(node.findByText('100,000.12')).not.toBeNull();
        });
        // a sample of locales
        ['en', 'it', 'de', 'fr', 'sk', 'tr', 'vi'].forEach(function (locale) {
            describe("using locale: '" + locale + "'", function () {
                beforeAll(function () { return numeral.locale(locale); });
                // currency and ordinal textual formats
                ['$0,0.00', '$ 0,0[.]00'].forEach(function (format) {
                    it("Should return a number formatted with format '" + format + "' in '" + locale + "'", function () {
                        var n = 100000.1234;
                        var node = (0, react_1.render)(React.createElement(index_1.TextFormat, { value: n, type: "number", format: format, locale: locale }));
                        expect(node.findByText(numeral(n).format(format))).not.toBeNull();
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=text-format.spec.js.map