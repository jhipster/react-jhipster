/**
 * @vitest-environment jsdom
 */
import { beforeAll, describe, expect, it } from 'vitest';
import React from 'react';
import dayjs from 'dayjs';
import { render } from '@testing-library/react';
import numeral from 'numeral';
import 'numeral/locales'; // load numeral-js locale data

import { TextFormat } from './index';
describe('text-format component', () => {
  // All tests will go here
  describe('date format', () => {
    it('Should return Invalid Date in text when value is invalid', async () => {
      const { findByText } = render(<TextFormat value={null} type="date" />);
      expect(await findByText('Invalid Date')).not.toBeNull();
    });
    it('Should return blank when value is invalid and blankOnInvalid is true', () => {
      const { container } = render(<TextFormat value={null} type="date" blankOnInvalid />);
      expect(container.firstChild).toBeNull();
    });
    it('Should return default formatted date for valid date', () => {
      const d = new Date();
      const node = render(<TextFormat value={d} type="date" />);
      expect(node.findByText(dayjs(d).format())).not.toBeNull();
    });
    it('Should return formatted date for valid date and format', () => {
      const d = new Date();
      const node = render(<TextFormat value={d} type="date" format="DD MM YY" />);
      expect(node.findByText(dayjs(d).format('DD MM YY'))).not.toBeNull();
    });
    describe('using locales and formats', () => {
      const locales = ['en', 'it', 'de', 'fr', 'sk', 'tr', 'vi']; // a sample of locales
      const formats = ['ddd', 'dddd', 'MMM', 'MMMM']; // short and long textual formats of days and months
      locales.forEach(locale => {
        formats.forEach(format => {
          it(`Should return a valid date formatted with format '${format}' in '${locale}'`, () => {
            const d = new Date();
            const node = render(<TextFormat value={d} type="date" format={format} locale={locale} />);
            expect(node.findByText(dayjs(d).locale(locale).format(format))).not.toBeNull();
          });
        });
      });
    });
  });
  describe('number format', () => {
    it('Should return 0 in text when value is invalid', () => {
      const node = render(<TextFormat value={null} type="number" />);
      expect(node.findByText('0')).not.toBeNull();
    });
    it('Should return blank when value is invalid and blankOnInvalid is true', () => {
      const { container } = render(<TextFormat value={null} type="number" blankOnInvalid />);
      expect(container.firstChild).toBeNull();
    });
    it('Should return default formatted number for valid number', () => {
      const n = 100000;
      const node = render(<TextFormat value={n} type="number" />);
      expect(node.findByText('100,000')).not.toBeNull();
    });
    it('Should return formatted number for valid number and format', () => {
      const n = 100000.1234;
      const node = render(<TextFormat value={n} type="number" format="0,0.00" />);
      expect(node.findByText('100,000.12')).not.toBeNull();
    });
    // a sample of locales
    ['en', 'it', 'de', 'fr', 'sk', 'tr', 'vi'].forEach(locale => {
      describe(`using locale: '${locale}'`, () => {
        beforeAll(() => numeral.locale(locale));

        // currency and ordinal textual formats
        ['$0,0.00', '$ 0,0[.]00'].forEach(format => {
          it(`Should return a number formatted with format '${format}' in '${locale}'`, () => {
            const n = 100000.1234;
            const node = render(<TextFormat value={n} type="number" format={format} locale={locale} />);
            expect(node.findByText(numeral(n).format(format))).not.toBeNull();
          });
        });
      });
    });
  });
});
