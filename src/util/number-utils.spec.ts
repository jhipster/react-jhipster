import { describe, expect, it } from 'vitest';
import { isNumber } from './index';

describe('Number util', () => {
  describe('isNumber', () => {
    it('should return false when passed object is not a number', () => {
      expect(isNumber('foo')).toEqual(false);
      expect(isNumber('123foo')).toEqual(false);
      expect(isNumber('foo123foo')).toEqual(false);
      expect(isNumber('foo123')).toEqual(false);
      expect(isNumber({})).toEqual(false);
      expect(isNumber([10])).toEqual(false);
      expect(isNumber(true)).toEqual(false);
    });
    it('should return true when passed object is a number or undefined', () => {
      expect(isNumber(false)).toEqual(true);
      expect(isNumber('')).toEqual(true);
      expect(isNumber([])).toEqual(true);
      expect(isNumber(null)).toEqual(true);
      expect(isNumber(undefined)).toEqual(true);
      expect(isNumber(10)).toEqual(true);
      expect(isNumber(10.5)).toEqual(true);
      expect(isNumber(10_00.5_0)).toEqual(true);
      expect(isNumber('10')).toEqual(true);
      expect(isNumber('10.5')).toEqual(true);
      expect(isNumber('1000.50')).toEqual(true);
      expect(isNumber(Number.MIN_VALUE)).toEqual(true);
      expect(isNumber(Number.MAX_VALUE)).toEqual(true);
      expect(isNumber(Infinity)).toEqual(true);
    });
  });
});
