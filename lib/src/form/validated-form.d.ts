import React from 'react';
import { DefaultValues, FieldError, FieldValues, RegisterOptions, SubmitHandler, UseFormRegister, UseFormSetValue, ValidationMode } from 'react-hook-form';
import { InputProps } from 'reactstrap';
export interface ValidatedFormProps {
    children: React.ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    defaultValues?: DefaultValues<FieldValues>;
    mode?: keyof ValidationMode;
    [key: string]: any;
}
/**
 * A wrapper for simple validated forms using Reactstrap Form and React-hook-form.
 * The validated fields/inputs must be direct children of the form.
 * This components injects methods and values from react-hook-form's `useForm` hook into the ValidatedField/ValidatedInput components
 * For complex use cases or for nested children, use Reactstrap form elements
 * or ValidatedField or ValidatedInput and pass methods and values from react-hook-form's `useForm` hook
 * directly as props
 *
 * @param ValidatedFormProps
 * @returns JSX.Element
 */
export declare function ValidatedForm({ defaultValues, children, onSubmit, mode, ...rest }: ValidatedFormProps): JSX.Element;
export declare namespace ValidatedForm {
    var displayName: string;
}
export interface ValidatedInputProps extends InputProps {
    name: string;
    register?: UseFormRegister<FieldValues>;
    error?: FieldError;
    isTouched?: boolean;
    isDirty?: boolean;
    validate?: RegisterOptions;
    value?: any;
    defaultValue?: string | number | string[];
}
export interface ValidatedFieldProps extends ValidatedInputProps {
    label?: string;
    labelClass?: string;
    labelHidden?: boolean;
    row?: boolean;
    col?: any;
    check?: boolean;
    inputClass?: string;
    inputTag?: React.ElementType;
}
/**
 * A utility wrapper over Reactstrap Input component thats uses react-hook-form data to
 * show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedInputProps
 * @returns JSX.Element
 */
export declare function ValidatedInput({ name, id, register, error, isTouched, isDirty, validate, children, className, onChange, onBlur, ...attributes }: ValidatedInputProps): JSX.Element;
export declare namespace ValidatedInput {
    var displayName: string;
}
/**
 * A utility wrapper over Reactstrap FormGroup + Label + ValidatedInput
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedFieldProps
 * @returns JSX.Element
 */
export declare function ValidatedField({ children, name, id, disabled, className, check, row, col, tag, label, labelClass, labelHidden, inputClass, inputTag, hidden, ...attributes }: ValidatedFieldProps): JSX.Element;
export declare namespace ValidatedField {
    var displayName: string;
}
interface ValidatedBlobFieldProps extends ValidatedFieldProps {
    setValue?: UseFormSetValue<{
        [x: string]: any;
    }>;
    defaultContentType?: string;
    isImage?: boolean;
    imageStyle?: Record<string, string>;
    imageClassName?: string;
    clearBtn?: (clearBlob: () => void) => React.ReactElement;
    openActionLabel?: string;
}
/**
 * A utility wrapper over Reactstrap FormGroup + Label + Input for blobs and images
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedBlobFieldProps
 * @returns JSX.Element
 */
export declare function ValidatedBlobField({ name, register, setValue, error, isTouched, isDirty, validate, children, className, onChange, onBlur, id, disabled, row, col, tag, label, labelClass, labelHidden, inputClass, inputTag, hidden, defaultValue, defaultContentType, isImage, imageStyle, imageClassName, clearBtn, openActionLabel, type, check, ...attributes }: ValidatedBlobFieldProps): JSX.Element;
export declare namespace ValidatedBlobField {
    var displayName: string;
}
export declare function isEmail(value: any): boolean;
export {};
