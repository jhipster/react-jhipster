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
        const isValidated = child?.props?.name && ['ValidatedField', 'ValidatedInput'].includes((child.type as any).displayName);
        return isValidated
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: child.props.register || register,
                error: child.props.error || errors[child.props.name],
                isTouched: child.props.isTouched || touchedFields[child.props.name],
                isDirty: child.props.isDirty || dirtyFields[child.props.name],
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
}

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
  className = className || '';
  className = isTouched ? `${className} is-touched` : className;
  className = isDirty ? `${className} is-dirty` : className;

  if (!register) {
    return (
      <Input name={name} className={className} onChange={onChange} onBlur={onBlur} {...attributes}>
        {children}
      </Input>
    );
  }
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

export function ValidatedField({
  children,
  id,
  disabled,
  className,
  check,
  row,
  col,
  label,
  labelClass,
  labelHidden,
  inputClass,
  ...attributes
}: ValidatedFieldProps): JSX.Element {
  const input = (
    <ValidatedInput id={id} disabled={disabled} className={inputClass} {...attributes}>
      {children}
    </ValidatedInput>
  );

  const inputRow = row ? <Col {...col}>{input}</Col> : <>{input}</>;
  return (
    <FormGroup check={check} disabled={disabled} row={row} className={className}>
      {check && inputRow}
      {label && (
        <Label for={id} className={labelClass} hidden={labelHidden}>
          {label}
        </Label>
      )}
      {!check && inputRow}
    </FormGroup>
  );
}
