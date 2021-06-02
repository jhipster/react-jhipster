"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment jsdom
 */
var index_1 = require("./index");
describe('Storage Util', function () {
    describe('getStorage', function () {
        it('should return appropriate storage type', function () {
            var out = index_1.getStorage(0 /* SESSION */);
            expect(out).toEqual(window.sessionStorage);
            out = index_1.getStorage(1 /* LOCAL */);
            expect(out).toEqual(window.localStorage);
        });
    });
    describe('set', function () {
        it('should set key for correct storage type', function () {
            index_1.Storage.session.set('testKey', 'testVal');
            var out = window.sessionStorage.getItem('testKey');
            expect(JSON.parse(out)).toEqual('testVal');
            index_1.Storage.local.set('testKey', 'testVal');
            out = window.localStorage.getItem('testKey');
            expect(JSON.parse(out)).toEqual('testVal');
        });
    });
    describe('get', function () {
        it('should return key from correct storage type', function () {
            window.sessionStorage.setItem('testKey', 'testVal');
            var out = index_1.Storage.session.get('testKey');
            expect(out).toEqual('testVal');
            window.localStorage.setItem('testKey', 'testVal');
            out = index_1.Storage.local.get('testKey');
            expect(out).toEqual('testVal');
        });
    });
    describe('remove', function () {
        it('should remove key from correct storage type', function () {
            window.sessionStorage.setItem('testKey', 'testVal');
            index_1.Storage.session.remove('testKey');
            var out = window.sessionStorage.getItem('testKey');
            expect(out).toEqual(null);
            window.localStorage.setItem('testKey', 'testVal');
            index_1.Storage.local.remove('testKey');
            out = window.localStorage.getItem('testKey');
            expect(out).toEqual(null);
        });
    });
});
//# sourceMappingURL=storage-util.spec.js.map