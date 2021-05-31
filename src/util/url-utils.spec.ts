import { expect } from 'chai';

import { parseHeaderForLinks, getUrlParameter } from './index';

describe('parseHeaderForLinks', () => {
  it('should throw an error when passed an empty string', () => {
    expect(() => parseHeaderForLinks('')).to.throw(Error, 'input must not be of zero length');
  });

  it('should throw an error when passed without comma', () => {
    expect(() => parseHeaderForLinks('test')).to.throw(Error, 'section could not be split on ";"');
  });

  it('should throw an error when passed without semicolon', () => {
    expect(() => parseHeaderForLinks('test,test2')).to.throw(Error, 'section could not be split on ";"');
  });

  it('should return links when headers are passed', () => {
    const links = { last: 0, first: 0 };
    expect(parseHeaderForLinks('</api/audits?page=0&size=20>; rel="last",</api/audits?page=0&size=20>; rel="first"')).to.eql(links);
  });
});

describe('getUrlParameter', () => {
  it('should get url params for passed names', () => {
    expect(getUrlParameter('test', '?test=hello')).to.eql('hello');
    expect(getUrlParameter('[test]', '?[test]=hello')).to.eql('hello');
    expect(getUrlParameter('key', '?key=123hghygh1225')).to.eql('123hghygh1225');
    expect(getUrlParameter('key', '?test=1245&key=123hghygh1225')).to.eql('123hghygh1225');
    expect(getUrlParameter('key', '?test=1245&key=123hghygh1225&test2=55558')).to.eql('123hghygh1225');
    expect(getUrlParameter('key', '?test=1245&key=123hghyg+h1225&test2=55558')).to.eql('123hghyg h1225');
  });

  it('should return an empty string for missing name', () => {
    expect(getUrlParameter('test', '?')).to.eql('');
  });
});
