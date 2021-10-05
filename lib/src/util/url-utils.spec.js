"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('parseHeaderForLinks', function () {
    it('should throw an error when passed an empty string', function () {
        expect(function () { return (0, index_1.parseHeaderForLinks)(''); }).toThrowError(Error);
    });
    it('should throw an error when passed without comma', function () {
        expect(function () { return (0, index_1.parseHeaderForLinks)('test'); }).toThrowError(Error);
    });
    it('should throw an error when passed without semicolon', function () {
        expect(function () { return (0, index_1.parseHeaderForLinks)('test,test2'); }).toThrowError(Error);
    });
    it('should return links when headers are passed', function () {
        var links = { last: 0, first: 0 };
        expect((0, index_1.parseHeaderForLinks)('</api/audits?page=0&size=20>; rel="last",</api/audits?page=0&size=20>; rel="first"')).toEqual(links);
    });
});
describe('getUrlParameter', function () {
    it('should get url params for passed names', function () {
        expect((0, index_1.getUrlParameter)('test', '?test=hello')).toEqual('hello');
        expect((0, index_1.getUrlParameter)('[test]', '?[test]=hello')).toEqual('hello');
        expect((0, index_1.getUrlParameter)('key', '?key=123hghygh1225')).toEqual('123hghygh1225');
        expect((0, index_1.getUrlParameter)('key', '?test=1245&key=123hghygh1225')).toEqual('123hghygh1225');
        expect((0, index_1.getUrlParameter)('key', '?test=1245&key=123hghygh1225&test2=55558')).toEqual('123hghygh1225');
        expect((0, index_1.getUrlParameter)('key', '?test=1245&key=123hghyg+h1225&test2=55558')).toEqual('123hghyg h1225');
    });
    it('should return an empty string for missing name', function () {
        expect((0, index_1.getUrlParameter)('test', '?')).toEqual('');
    });
});
//# sourceMappingURL=url-utils.spec.js.map