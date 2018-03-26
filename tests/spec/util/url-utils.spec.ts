import { expect } from 'chai';

import { parse } from '../../../react-jhipster';

describe('Parse links test', () => {
  describe('Parse Links test', () => {
    it('should throw an error when passed an empty string', () => {
      expect(() => parse('')).to.throw(Error, 'input must not be of zero length');
    });

    it('should throw an error when passed without comma', () => {
      expect(() => parse('test')).to.throw(Error, 'section could not be split on ";"');
    });

    it('should throw an error when passed without semicolon', () => {
      expect(() => parse('test,test2')).to.throw(Error, 'section could not be split on ";"');
    });

    it('should return links when headers are passed', () => {
      const links = { last: 0, first: 0 };
      expect(parse('</api/audits?page=0&size=20>; rel="last",</api/audits?page=0&size=20>; rel="first"')).to.eql(links);
    });
  });
});
