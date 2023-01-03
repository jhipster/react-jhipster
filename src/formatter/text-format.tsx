/*
 Copyright 2017-2023 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import React from 'react';
import numeral from 'numeral';
import dayjs from 'dayjs';
import TranslatorContext from '../language/translator-context';
import 'numeral/locales';

export type ITextFormatTypes = 'date' | 'number';

export interface ITextFormatProps {
  value: string | number | Date;
  type: ITextFormatTypes;
  format?: string;
  blankOnInvalid?: boolean;
  locale?: string;
}

/**
 * Formats the given value to specified type like date or number.
 * @param value value to be formatted
 * @param type type of formatting to use ${ITextFormatTypes}
 * @param format optional format to use.
 *    For date type dayjs(https://day.js.org/docs/en/display/format) format is used
 *    For number type NumeralJS (http://numeraljs.com/#format) format is used
 * @param blankOnInvalid optional to output error or blank on null/invalid values
 * @param locale optional locale in which to format value or current locale from TranslatorContext
 */
export const TextFormat = ({ value, type, format, blankOnInvalid, locale }: ITextFormatProps) => {
  if (blankOnInvalid) {
    if (!value || !type) return null;
  }

  if (!locale) {
    // TODO: find a better way to keep track of *current* locale
    locale = TranslatorContext.context.locale;

    if (!numeral.locales[locale]) {
      // if not include, by default as en
      numeral.locale('en');
    } else {
      numeral.locale(locale);
    }
  }

  if (type === 'date') {
    return <span>{locale ? dayjs(value).locale(locale).format(format) : dayjs(value).format(format)}</span>;
  } else if (type === 'number') {
    return <span>{numeral(value).format(format)}</span>;
  }
  return <span>{value.toString()}</span>;
};
