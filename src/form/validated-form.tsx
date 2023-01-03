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
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputProps, Label, Row } from 'reactstrap';

import { byteSize, isEmpty, openFile, setFileData } from '../util';

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
    setValue,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({ mode: mode || 'onTouched', defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      {React.Children.map(children, (child: ReactElement) => {
        const type = child?.type as any;
        const isValidated =
          type && child?.props?.name && ['ValidatedField', 'ValidatedInput', 'ValidatedBlobField'].includes(type.displayName);

        if (isValidated) {
          const childName = child.props.name;
          const elem = {
            ...child.props,
            register: child.props.register || register,
            error: child.props.error || errors[childName],
            isTouched: typeof child.props.isTouched === 'undefined' ? touchedFields[childName] : child.props.isTouched,
            isDirty: typeof child.props.isDirty === 'undefined' ? dirtyFields[childName] : child.props.isDirty,
            key: childName,
          };
          if (type.displayName === 'ValidatedBlobField') {
            const defaultValue = defaultValues[childName];
            const defaultContentType = defaultValues[`${childName}ContentType`];
            elem.setValue = typeof child.props.setValue === 'undefined' ? setValue : child.props.setValue;
            elem.defaultValue = typeof child.props.defaultValue === 'undefined' ? defaultValue : child.props.defaultValue;
            elem.defaultContentType =
              typeof child.props.defaultContentType === 'undefined' ? defaultContentType : child.props.defaultContentType;
          }
          return React.createElement(type, { ...elem });
        }
        return child;
      })}
    </Form>
  );
}

ValidatedForm.displayName = 'ValidatedForm';

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
  ...attributes
}: ValidatedInputProps): JSX.Element {
  if (!register) {
    return (
      <Input name={name} id={id} className={className} onChange={onChange} onBlur={onBlur} {...attributes}>
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
        id={id}
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

ValidatedInput.displayName = 'ValidatedInput';

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
 * A utility wrapper over Reactstrap FormGroup + Label + Input for blobs and images
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedBlobFieldProps
 * @returns JSX.Element
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
}: ValidatedBlobFieldProps): JSX.Element {
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
    <FormGroup disabled={disabled} row={row} className={className} hidden={hidden} tag={tag}>
      {label && (
        <Label id={`${name}Label`} for={id} className={labelClass} hidden={labelHidden || hidden}>
          {label}
        </Label>
      )}
      {inner}
    </FormGroup>
  );

  const inputRow = input => (row ? <Col {...col}>{input}</Col> : input);

  if (!register) {
    return renderFormGroup(
      inputRow(<Input type="file" id={id} name={name} className={className} onChange={onChange} onBlur={onBlur} {...attributes} />)
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
      <Input
        type="file"
        id={id}
        name={name}
        valid={isTouched && !error}
        invalid={!!error}
        className={className}
        onChange={e => {
          setFileData(
            e,
            (contentType, data) => {
              setBlobValue(data, contentType);
            },
            isImage
          );
          onChange && onChange(e);
        }}
        onBlur={e => {
          setFileData(
            e,
            (contentType, data) => {
              setBlobValue(data, contentType);
            },
            isImage
          );
          onBlur && onBlur(e);
        }}
        {...attributes}
      />
      {error && <FormFeedback>{error.message}</FormFeedback>}
    </>
  );

  const defaultClearBtn = (
    <Button color="danger" size="sm" onClick={clearBlob}>
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
    </>
  );
}

ValidatedBlobField.displayName = 'ValidatedBlobField';

const EMAIL_REGEXP =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export function isEmail(value) {
  if (isEmpty(value)) return true;

  return EMAIL_REGEXP.test(value);
}
