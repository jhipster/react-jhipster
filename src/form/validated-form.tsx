/*
 Copyright 2017-2026 the original author or authors from the JHipster project.

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
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import {
  DefaultValues,
  FieldError,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  ValidationMode,
} from 'react-hook-form';
import { Button, Col, Form, FormControl, FormControlProps, Row } from 'react-bootstrap';

import { byteSize, isEmpty, openFile, setFileData } from '../util';

export interface ValidatedFormProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: DefaultValues<FieldValues>;
  mode?: keyof ValidationMode;
  [key: string]: any;
}

/**
 * A wrapper for simple validated forms using React-Bootstrap Form and React-hook-form.
 * The validated fields/inputs must be direct children of the form.
 * This components injects methods and values from react-hook-form's `useForm` hook into the ValidatedField/ValidatedInput components
 * For complex use cases or for nested children, use React-Bootstrap form elements
 * or ValidatedField or ValidatedInput and pass methods and values from react-hook-form's `useForm` hook
 * directly as props
 *
 * @param ValidatedFormProps
 * @returns React.JSX.Element
 */
export function ValidatedForm({ defaultValues, children, onSubmit, mode, ...rest }: ValidatedFormProps): React.JSX.Element {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({ mode: mode || 'onTouched', defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      {React.Children.map(children, (child: ReactElement) => {
        const props: any = child?.props;
        const type = child?.type as any;
        const isValidated = type && props?.name && ['ValidatedField', 'ValidatedInput', 'ValidatedBlobField'].includes(type.displayName);

        if (isValidated) {
          const childName = props.name;
          const elem = {
            ...props,
            register: props.register || register,
            error: props.error || errors[childName],
            isTouched: typeof props.isTouched === 'undefined' ? touchedFields[childName] : props.isTouched,
            isDirty: typeof props.isDirty === 'undefined' ? dirtyFields[childName] : props.isDirty,
            key: childName,
          };
          if (type.displayName === 'ValidatedBlobField') {
            const defaultValue = defaultValues[childName];
            const defaultContentType = defaultValues[`${childName}ContentType`];
            elem.setValue = typeof props.setValue === 'undefined' ? setValue : props.setValue;
            elem.defaultValue = typeof props.defaultValue === 'undefined' ? defaultValue : props.defaultValue;
            elem.defaultContentType = typeof props.defaultContentType === 'undefined' ? defaultContentType : props.defaultContentType;
          }
          return React.createElement(type, { ...elem });
        }
        return child;
      })}
    </Form>
  );
}

ValidatedForm.displayName = 'ValidatedForm';

export interface ValidatedInputProps extends FormControlProps {
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
  // tag attribute for input — maps to the 'as' prop in react-bootstrap
  tag?: React.ElementType;
  // whether the field is hidden
  hidden?: boolean;
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
 * A utility wrapper over React-Bootstrap form components that uses react-hook-form data to
 * show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedInputProps
 * @returns React.JSX.Element
 */
export function ValidatedInput({
  name,
  id = name,
  register,
  error,
  isTouched,
  isDirty,
  validate,
  children,
  className,
  onChange,
  onBlur,
  tag,
  hidden,
  type,
  ...attributes
}: ValidatedInputProps): React.JSX.Element {
  const isCheckOrRadio = !tag && (type === 'checkbox' || type === 'radio');
  const isSelect = !tag && type === 'select';

  if (!register) {
    if (isSelect) {
      return (
        <Form.Select
          name={name}
          id={id}
          className={className}
          onChange={onChange as any}
          onBlur={onBlur as any}
          hidden={hidden}
          {...(attributes as any)}
        >
          {children}
        </Form.Select>
      );
    }
    if (isCheckOrRadio) {
      return (
        <input
          type={type}
          name={name}
          id={id}
          className={`form-check-input${className ? ` ${className}` : ''}`}
          onChange={onChange as any}
          onBlur={onBlur as any}
          hidden={hidden}
          {...(attributes as any)}
        />
      );
    }
    return (
      <FormControl
        name={name}
        id={id}
        type={type}
        className={className}
        onChange={onChange}
        onBlur={onBlur}
        as={tag}
        hidden={hidden}
        {...attributes}
      >
        {children}
      </FormControl>
    );
  }

  className = className || '';
  className = isTouched ? `${className} is-touched` : className;
  className = isDirty ? `${className} is-dirty` : className;

  const { name: registeredName, onBlur: onBlurValidate, onChange: onChangeValidate, ref } = register(name, validate);

  const handleChange = e => {
    void onChangeValidate(e);
    onChange && (onChange as any)(e);
  };
  const handleBlur = e => {
    void onBlurValidate(e);
    onBlur && (onBlur as any)(e);
  };

  if (isSelect) {
    return (
      <>
        <Form.Select
          name={registeredName}
          id={id}
          isValid={isTouched && !error}
          isInvalid={!!error}
          ref={ref}
          className={className}
          hidden={hidden}
          onChange={handleChange}
          onBlur={handleBlur}
          {...(attributes as any)}
        >
          {children}
        </Form.Select>
        {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
      </>
    );
  }

  if (isCheckOrRadio) {
    return (
      <>
        <input
          type={type}
          name={registeredName}
          id={id}
          ref={ref}
          className={`form-check-input${className ? ` ${className}` : ''}${isTouched && !error ? ' is-valid' : ''}${error ? ' is-invalid' : ''}`}
          hidden={hidden}
          onChange={handleChange}
          onBlur={handleBlur}
          {...(attributes as any)}
        />
        {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
      </>
    );
  }

  return (
    <>
      <FormControl
        name={registeredName}
        id={id}
        type={type}
        isValid={isTouched && !error}
        isInvalid={!!error}
        ref={ref}
        className={className}
        as={tag}
        hidden={hidden}
        onChange={handleChange}
        onBlur={handleBlur}
        {...attributes}
      >
        {children}
      </FormControl>
      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </>
  );
}

ValidatedInput.displayName = 'ValidatedInput';

/**
 * A utility wrapper over React-Bootstrap Form.Group + Form.Label + ValidatedInput
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedFieldProps
 * @returns React.JSX.Element
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
}: ValidatedFieldProps): React.JSX.Element {
  const input = (
    <ValidatedInput name={name} id={id} disabled={disabled} className={inputClass} hidden={hidden} tag={inputTag} {...attributes}>
      {children}
    </ValidatedInput>
  );

  const inputRow = row ? <Col {...col}>{input}</Col> : input;
  return (
    <Form.Group
      as={tag}
      className={`mb-3${className ? ` ${className}` : ''}${check ? ' form-check' : ''}${row ? ' row' : ''}`}
      hidden={hidden}
    >
      {check && inputRow}
      {label && (
        <Form.Label
          id={`${name}Label`}
          htmlFor={id}
          className={`${labelClass || ''}${check ? ' form-check-label' : ''}`}
          hidden={labelHidden || hidden}
        >
          {label}
        </Form.Label>
      )}
      {!check && inputRow}
    </Form.Group>
  );
}

ValidatedField.displayName = 'ValidatedField';

interface ValidatedBlobFieldProps extends ValidatedFieldProps {
  // set value function from react-hook-forms
  setValue?: UseFormSetValue<{
    [x: string]: any;
  }>;
  // default value for the blob content type
  defaultContentType?: string;
  // blob is an image
  isImage?: boolean;
  // style for image element
  imageStyle?: Record<string, string>;
  // css class for image
  imageClassName?: string;
  // clear button override
  clearBtn?: (clearBlob: () => void) => React.ReactElement;
  // label for open action for non image blobs
  openActionLabel?: string;
}

/**
 * A utility wrapper over React-Bootstrap Form.Group + Form.Label + FormControl for blobs and images
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedBlobFieldProps
 * @returns React.JSX.Element
 */
export function ValidatedBlobField({
  name,
  register,
  setValue,
  error,
  isTouched,
  isDirty,
  validate,
  children,
  className,
  onChange,
  onBlur,
  id = name,
  disabled,
  row,
  col,
  tag,
  label,
  labelClass,
  labelHidden,
  inputClass,
  inputTag,
  hidden,
  defaultValue,
  defaultContentType,
  isImage,
  imageStyle,
  imageClassName,
  clearBtn,
  openActionLabel,
  // will be ignored as type will always be `file`
  type,
  check,
  ...attributes
}: ValidatedBlobFieldProps): React.JSX.Element {
  const [blob, setBlobData] = useState<string>(defaultValue as string);
  const [blobContentType, setBlobContentType] = useState<string>(defaultContentType);

  const contentTypeName = `${name}ContentType`;

  const setBlobValue = (data, contentType) => {
    setBlobData(data);
    setBlobContentType(contentType);
    setValue(contentTypeName, contentType, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue(name, data, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const clearBlob = () => {
    setBlobValue(null, null);
  };

  const renderFormGroup = inner => (
    <Form.Group className={`mb-3${className ? ` ${className}` : ''}${row ? ' row' : ''}`} hidden={hidden}>
      {label && (
        <Form.Label id={`${name}Label`} htmlFor={id} className={labelClass} hidden={labelHidden || hidden}>
          {label}
        </Form.Label>
      )}
      {inner}
    </Form.Group>
  );

  const inputRow = input => (row ? <Col {...col}>{input}</Col> : input);

  if (!register) {
    return renderFormGroup(
      inputRow(<FormControl type="file" id={id} name={name} className={className} onChange={onChange} onBlur={onBlur} {...attributes} />),
    );
  }

  className = className || '';
  className = isTouched ? `${className} is-touched` : className;
  className = isDirty ? `${className} is-dirty` : className;

  useEffect(() => {
    register(name, validate);
    register(contentTypeName, validate);
  }, [register]);

  const input = (
    <>
      <input id={`file_${name}_content_type`} name={contentTypeName} type="hidden" />
      <FormControl
        type="file"
        id={id}
        name={name}
        isValid={isTouched && !error}
        isInvalid={!!error}
        className={className}
        onChange={e => {
          setFileData(
            e as any,
            (contentType, data) => {
              setBlobValue(data, contentType);
            },
            isImage,
          );
          onChange && onChange(e);
        }}
        onBlur={e => {
          setFileData(
            e as any,
            (contentType, data) => {
              setBlobValue(data, contentType);
            },
            isImage,
          );
          onBlur && onBlur(e);
        }}
        {...attributes}
      />
      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </>
  );

  const defaultClearBtn = (
    <Button variant="danger" size="sm" onClick={clearBlob}>
      <strong>&nbsp;x&nbsp;</strong>
    </Button>
  );

  return renderFormGroup(
    <>
      <br />
      {blob ? (
        <div className="mb-3 mt-2 jhi-validated-blob-field-item-container">
          {blobContentType ? (
            <a onClick={openFile(blobContentType, blob)} className="jhi-validated-blob-field-item-anchor">
              {isImage ? (
                <img
                  src={`data:${blobContentType};base64,${blob}`}
                  style={imageStyle || { maxHeight: '100px' }}
                  className={imageClassName}
                />
              ) : (
                openActionLabel || 'Open'
              )}
            </a>
          ) : null}
          <br />
          <Row className="jhi-validated-blob-field-item-row">
            <Col md="11" className="jhi-validated-blob-field-item-row-col">
              <span>
                {blobContentType}, {byteSize(blob)}
              </span>
            </Col>
            <Col md="1" className="jhi-validated-blob-field-item-row-col jhi-validated-blob-field-item-clear-btn">
              {clearBtn ? clearBtn(clearBlob) : defaultClearBtn}
            </Col>
          </Row>
        </div>
      ) : null}
      {inputRow(input)}
    </>,
  );
}

ValidatedBlobField.displayName = 'ValidatedBlobField';

const EMAIL_REGEXP =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export function isEmail(value) {
  if (isEmpty(value)) return true;

  return EMAIL_REGEXP.test(value);
}
