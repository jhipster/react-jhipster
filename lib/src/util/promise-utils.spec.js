"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('Promise util', function () {
    describe('isPromise', function () {
        it('should return false when passed object is not promise like', function () {
            var inp = {};
            expect(index_1.isPromise(inp)).toEqual(false);
        });
        it('should return true when passed object is promise like', function () {
            var inp = Promise.resolve(true);
            expect(index_1.isPromise(inp)).toEqual(true);
        });
    });
});
//# sourceMappingURL=promise-utils.spec.js.map