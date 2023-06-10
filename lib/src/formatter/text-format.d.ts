/// <reference types="react" />
import 'numeral/locales';
export declare type ITextFormatTypes = 'date' | 'number';
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
export declare const TextFormat: ({ value, type, format, blankOnInvalid, locale }: ITextFormatProps) => JSX.Element;
