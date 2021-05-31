import * as React from 'react';
import * as dayjs from 'dayjs';
import { mount } from 'enzyme';
import { expect } from 'chai';
import * as numeral from 'numeral';
require('numeral/locales'); // load numeral-js locale data

import { TextFormat } from './index';

describe('text-format component', () => {
  // All tests will go here
  describe('date format', () => {
    it('Should return Invalid Date in text when value is invalid', () => {
      const node = mount(<TextFormat value={null} type="date" />);
      expect(node.length).to.eql(1);
      expect(node.text()).to.eql('Invalid Date');
    });
    it('Should return blank when value is invalid and blankOnInvalid is true', () => {
      const node = mount(<TextFormat value={null} type="date" blankOnInvalid />);
      expect(node.length).to.eql(1);
      expect(node.html()).to.eql(null);
    });
    it('Should return default formatted date for valid date', () => {
      const d = new Date();
      const node = mount(<TextFormat value={d} type="date" />);
      expect(node.length).to.eql(1);
      expect(node.text()).to.eql(dayjs(d).format());
    });
    it('Should return formatted date for valid date and format', () => {
      const d = new Date();
      const node = mount(<TextFormat value={d} type="date" format="DD MM YY" />);
      expect(node.length).to.eql(1);
      expect(node.text()).to.eql(dayjs(d).format('DD MM YY'));
    });
    describe('using locales and formats', () => {
      const locales = ['en', 'it', 'de', 'fr', 'sk', 'tr', 'vi']; // a sample of locales
      const formats = ['ddd', 'dddd', 'MMM', 'MMMM']; // short and long textual formats of days and months
      locales.forEach(locale => {
        formats.forEach(format => {
          it(`Should return a valid date formatted with format '${format}' in '${locale}'`, () => {
            const d = new Date();
            const node = mount(<TextFormat value={d} type="date" format={format} locale={locale} />);
            expect(node.length).to.eql(1);
            expect(node.text()).to.eql(
              dayjs(d)
                .locale(locale)
                .format(format)
            );
          });
        });
      });
    });
  });
  describe('number format', () => {
    it('Should return 0 in text when value is invalid', () => {
      const node = mount(<TextFormat value={null} type="number" />);
      expect(node.length).to.eql(1);
      expect(node.text()).to.eql('0');
    });
    it('Should return blank when value is invalid and blankOnInvalid is true', () => {
      const node = mount(<TextFormat value={null} type="number" blankOnInvalid />);
      expect(node.length).to.eql(1);
      expect(node.html()).to.eql(null);
    });
    it('Should return default formatted number for valid number', () => {
      const n = 100000;
      const node = mount(<TextFormat value={n} type="number" />);
      expect(node.length).to.eql(1);
      expect(node.text()).to.eql('100,000');
    });
    it('Should return formatted number for valid number and format', () => {
      const n = 100000.1234;
      const node = mount(<TextFormat value={n} type="number" format="0,0.00" />);
      expect(node.length).to.eql(1);
      expect(node.text()).to.eql('100,000.12');
    });
    // a sample of locales
    ['en', 'it', 'de', 'fr', 'sk', 'tr', 'vi'].forEach(locale => {
      describe(`using locale: '${locale}'`, () => {
        before(() => numeral.locale(locale));

        // currency and ordinal textual formats
        ['$0,0.00', '$ 0,0[.]00'].forEach(format => {
          it(`Should return a number formatted with format '${format}' in '${locale}'`, () => {
            const n = 100000.1234;
            const node = mount(<TextFormat value={n} type="number" format={format} locale={locale} />);
            expect(node.length).to.eql(1);
            expect(node.text()).to.eql(numeral(n).format(format));
          });
        });
      });
    });
  });
});
