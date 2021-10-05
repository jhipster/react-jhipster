"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var pagination_utils_1 = require("./pagination-utils");
describe('loadMoreDataWhenScrolled', function () {
    var setLinks = function (first, last, prev) { return ({ first: first, last: last, prev: prev }); };
    var state = { entities: [{ 1: 'fake1' }, { 2: 'fake2' }, { 3: 'fake3' }] };
    var payload = { data: [{ 1: 'fake4' }, { 2: 'fake2' }, { 3: 'fake3' }] };
    describe('When sorting/deleting/editing or if there is only one page', function () {
        it('should replace current data with incoming data', function () {
            expect((0, pagination_utils_1.loadMoreDataWhenScrolled)(state.entities, payload.data, setLinks(0, 0, 0))).toEqual(payload.data);
        });
    });
    describe('When current data length is greater or equal than incoming data length', function () {
        it('should extend current data with incoming data', function () {
            expect((0, pagination_utils_1.loadMoreDataWhenScrolled)(state.entities, payload.data, setLinks(0, 3, 1))).toEqual(__spreadArray(__spreadArray([], state.entities, true), payload.data, true));
        });
    });
});
/* TODO add unit tests */
//# sourceMappingURL=pagination-utils.spec.js.map