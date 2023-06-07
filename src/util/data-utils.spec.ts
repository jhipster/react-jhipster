import { describe, expect, it } from 'vitest';
import { size, byteSize } from './index';

describe('Data utils', () => {
  describe('size', () => {
    it('should return the correct size', () => {
      const data = 'Hello Jhipster';
      expect(size(data)).toBe(10.5);
      expect(size('')).toBe(0);
    });
  });

  describe('byteSize', () => {
    it('should return the correct value', () => {
      const data = 'Hello Jhipster';
      expect(byteSize(data)).toBe('10.5 bytes');
      expect(byteSize('')).toBe('0 bytes');
    });
  });
});
