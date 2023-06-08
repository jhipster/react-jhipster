import { describe, expect, it } from 'vitest';
import { isPromise } from './index';

describe('Promise util', () => {
  describe('isPromise', () => {
    it('should return false when passed object is not promise like', () => {
      const inp = {};
      expect(isPromise(inp)).toEqual(false);
    });
    it('should return true when passed object is promise like', () => {
      const inp = Promise.resolve(true);
      expect(isPromise(inp)).toEqual(true);
    });
  });
});
