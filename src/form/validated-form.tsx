/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { ReactElement, useEffect } from 'react';
import {
  DefaultValues,
  FieldError,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
  ValidationMode,
} from 'react-hook-form';
import { Col, Form, FormFeedback, FormGroup, Input, InputProps, Label } from 'reactstrap';

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
export function ValidatedForm({ defaultValues, children, onSubmit, mode, ...rest }: ValidatedFormProps): JSX.Element {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({ mode: mode || 'onTouched', defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      {React.Children.map(children, (child: ReactElement) => {
        const isValidated =
          child?.props?.name &&
          (['ValidatedField', 'ValidatedInput'].includes((child.type as any).displayName) ||
            ['ValidatedField', 'ValidatedInput'].includes((child.type as any).name));
        return isValidated
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: child.props.register || register,
                error: child.props.error || errors[child.props.name],
                isTouched: typeof child.props.isTouched !== 'undefined' ? touchedFields[child.props.name] : child.props.isTouched,
                isDirty: typeof child.props.isDirty !== 'undefined' ? dirtyFields[child.props.name] : child.props.isDirty,
                key: child.props.name,
              },
            })
          : child;
      })}
    </Form>
  );
}

export interface ValidatedInputProps extends InputProps {
  // name of the component, also used for validation
  name: string;
  // register function from react-hook-form
  register?: UseFormRegister<FieldValues>;
  // error object from react-hook-form for the field, errors[fieldsName]
  error?: FieldError;
  // isTouched from react-hook-form for the field, touchedFields[fieldsName]
  isTouched?: boolean;
  // isDirty from react-hook-form for the field, dirtyFields[fieldsName]
  isDirty?: boolean;
  // validation rules for react-hook-form register function
  validate?: RegisterOptions;
  // value for the input element
  value?: any;
  // default value for the Input component, not needed if defaultValues for ValidatedForm is set
  defaultValue?: string | number | string[];
}

export interface ValidatedFieldProps extends ValidatedInputProps {
  // label for the field
  label?: string;
  // className for label
  labelClass?: string;
  // hide the label
  labelHidden?: boolean;
  // Field is a column inside a row
  row?: boolean;
  // objet holding attributes for the rendered column in row mode
  col?: any;
  // field is checkbox. The input will be rendered before the label
  check?: boolean;
  // css class for the input element
  inputClass?: string;
  // tag attribute for input
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
export function ValidatedInput({
  name,
  register,
  error,
  isTouched,
  isDirty,
  validate,
  children,
  className,
  onChange,
  onBlur,
  ...attributes
}: ValidatedInputProps): JSX.Element {
  if (!register) {
    return (
      <Input name={name} className={className} onChange={onChange} onBlur={onBlur} {...attributes}>
        {children}
      </Input>
    );
  }

  className = className || '';
  className = isTouched ? `${className} is-touched` : className;
  className = isDirty ? `${className} is-dirty` : className;

  const { name: registeredName, onBlur: onBlurValidate, onChange: onChangeValidate, ref } = register(name, validate);
  return (
    <>
      <Input
        name={registeredName}
        valid={isTouched && !error}
        invalid={!!error}
        innerRef={ref}
        className={className}
        onChange={e => {
          void onChangeValidate(e);
          onChange && onChange(e);
        }}
        onBlur={e => {
          void onBlurValidate(e);
          onBlur && onBlur(e);
        }}
        {...attributes}
      >
        {children}
      </Input>
      {error && <FormFeedback>{error.message}</FormFeedback>}
    </>
  );
}

/**
 * A utility wrapper over Reactstrap FormGroup + Label + ValidatedInput
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedFieldProps
 * @returns JSX.Element
 */
export function ValidatedField({
  children,
  name,
  id,
  disabled,
  className,
  check,
  row,
  col,
  tag,
  label,
  labelClass,
  labelHidden,
  inputClass,
  inputTag,
  hidden,
  ...attributes
}: ValidatedFieldProps): JSX.Element {
  const input = (
    <ValidatedInput name={name} id={id} disabled={disabled} className={inputClass} hidden={hidden} tag={inputTag} {...attributes}>
      {children}
    </ValidatedInput>
  );

  const inputRow = row ? <Col {...col}>{input}</Col> : input;
  return (
    <FormGroup check={check} disabled={disabled} row={row} className={className} hidden={hidden} tag={tag}>
      {check && inputRow}
      {label && (
        <Label id={`${name}Label`} check={check} for={id} className={labelClass} hidden={labelHidden || hidden}>
          {label}
        </Label>
      )}
      {!check && inputRow}
    </FormGroup>
  );
}
