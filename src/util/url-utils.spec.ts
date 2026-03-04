import { describe, expect, it } from 'vitest';
import { getUrlParameter } from './index';

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
