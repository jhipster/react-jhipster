import { describe, expect, it } from 'vitest';
import { parseHeaderForLinks, getUrlParameter } from './index';

describe('parseHeaderForLinks', () => {
  it('should throw an error when passed an empty string', () => {
    expect(() => parseHeaderForLinks('')).toThrowError(Error);
  });

  it('should throw an error when passed without comma', () => {
    expect(() => parseHeaderForLinks('test')).toThrowError(Error);
  });

  it('should throw an error when passed without semicolon', () => {
    expect(() => parseHeaderForLinks('test,test2')).toThrowError(Error);
  });

  it('should return links when headers are passed', () => {
    const links = { last: 0, first: 0 };
    expect(parseHeaderForLinks('</api/audits?page=0&size=20>; rel="last",</api/audits?page=0&size=20>; rel="first"')).toEqual(links);
  });
});

describe('getUrlParameter', () => {
  it('should get url params for passed names', () => {
    expect(getUrlParameter('test', '?test=hello')).toEqual('hello');
    expect(getUrlParameter('[test]', '?[test]=hello')).toEqual('hello');
    expect(getUrlParameter('key', '?key=123hghygh1225')).toEqual('123hghygh1225');
    expect(getUrlParameter('key', '?test=1245&key=123hghygh1225')).toEqual('123hghygh1225');
    expect(getUrlParameter('key', '?test=1245&key=123hghygh1225&test2=55558')).toEqual('123hghygh1225');
    expect(getUrlParameter('key', '?test=1245&key=123hghyg+h1225&test2=55558')).toEqual('123hghyg h1225');
  });

  it('should return an empty string for missing name', () => {
    expect(getUrlParameter('test', '?')).toEqual('');
  });
});
