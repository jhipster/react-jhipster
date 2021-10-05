"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('Number util', function () {
    describe('isNumber', function () {
        it('should return false when passed object is not a number', function () {
            expect((0, index_1.isNumber)('foo')).toEqual(false);
            expect((0, index_1.isNumber)('123foo')).toEqual(false);
            expect((0, index_1.isNumber)('foo123foo')).toEqual(false);
            expect((0, index_1.isNumber)('foo123')).toEqual(false);
            expect((0, index_1.isNumber)({})).toEqual(false);
            expect((0, index_1.isNumber)([10])).toEqual(false);
            expect((0, index_1.isNumber)(true)).toEqual(false);
        });
        it('should return true when passed object is a number or undefined', function () {
            expect((0, index_1.isNumber)(false)).toEqual(true);
            expect((0, index_1.isNumber)('')).toEqual(true);
            expect((0, index_1.isNumber)([])).toEqual(true);
            expect((0, index_1.isNumber)(null)).toEqual(true);
            expect((0, index_1.isNumber)(undefined)).toEqual(true);
            expect((0, index_1.isNumber)(10)).toEqual(true);
            expect((0, index_1.isNumber)(10.5)).toEqual(true);
            expect((0, index_1.isNumber)(1000.5)).toEqual(true);
            expect((0, index_1.isNumber)('10')).toEqual(true);
            expect((0, index_1.isNumber)('10.5')).toEqual(true);
            expect((0, index_1.isNumber)('1000.50')).toEqual(true);
            expect((0, index_1.isNumber)(Number.MIN_VALUE)).toEqual(true);
            expect((0, index_1.isNumber)(Number.MAX_VALUE)).toEqual(true);
            expect((0, index_1.isNumber)(Infinity)).toEqual(true);
        });
    });
});
//# sourceMappingURL=number-utils.spec.js.map