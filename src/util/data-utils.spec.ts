import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { byteSize, openFile, size, toOpenableContentType } from './index';

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

  describe('toOpenableContentType', () => {
    it('should open images inline', () => {
      expect(toOpenableContentType('image/png')).toBe('image/png');
      expect(toOpenableContentType('IMAGE/JPEG; charset=utf-8')).toBe('image/jpeg');
    });

    it('should download xml based images', () => {
      expect(toOpenableContentType('image/svg+xml')).toBe('application/octet-stream');
    });

    it('should open plain text inline', () => {
      expect(toOpenableContentType('text/plain')).toBe('text/plain');
      expect(toOpenableContentType('text/plain; charset=utf-8')).toBe('text/plain');
    });

    it('should open pdf inline', () => {
      expect(toOpenableContentType('application/pdf')).toBe('application/pdf');
      expect(toOpenableContentType('Application/PDF; charset=binary')).toBe('application/pdf');
    });

    it('should download active content and unknown content types', () => {
      expect(toOpenableContentType('text/html')).toBe('application/octet-stream');
      expect(toOpenableContentType('application/xhtml+xml')).toBe('application/octet-stream');
      expect(toOpenableContentType('application/json')).toBe('application/octet-stream');
      expect(toOpenableContentType('image/png" onload="alert(1)')).toBe('application/octet-stream');
      expect(toOpenableContentType('')).toBe('application/octet-stream');
      expect(toOpenableContentType(null)).toBe('application/octet-stream');
      expect(toOpenableContentType(undefined)).toBe('application/octet-stream');
    });
  });

  describe('openFile', () => {
    const data = btoa('Hello Jhipster');
    const fileURL = 'blob:http://localhost/file';
    let blobs: Blob[];
    let win: { onload?: () => void };
    let open: ReturnType<typeof vi.fn>;
    let revokeObjectURL: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      blobs = [];
      win = {};
      open = vi.fn(() => win);
      revokeObjectURL = vi.fn();
      vi.stubGlobal('open', open);
      vi.spyOn(globalThis.URL, 'createObjectURL').mockImplementation((blob: Blob) => {
        blobs.push(blob);
        return fileURL;
      });
      vi.spyOn(globalThis.URL, 'revokeObjectURL').mockImplementation(revokeObjectURL);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    it('should open an object url and revoke it once loaded', () => {
      openFile('image/png', data)();

      expect(open).toHaveBeenCalledWith(fileURL);
      expect(blobs).toHaveLength(1);
      expect(blobs[0].type).toBe('image/png');
      expect(blobs[0].size).toBe('Hello Jhipster'.length);

      win.onload?.();
      expect(revokeObjectURL).toHaveBeenCalledWith(fileURL);
    });

    it('should never use the content type as markup', () => {
      openFile('text/html" onload="alert(1)', data)();

      expect(blobs[0].type).toBe('application/octet-stream');
      expect(open).toHaveBeenCalledWith(fileURL);
    });

    it('should download html content', () => {
      openFile('text/html', data)();

      expect(blobs[0].type).toBe('application/octet-stream');
    });
  });
});
