import React from "react";
import { FieldValues, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
import { translate } from "../language";


export interface ValidatedTextInputFieldProps {
  register:  UseFormRegister<FieldValues>,
  touchedFields: any, errors,
  setValue: UseFormSetValue<FieldValues>,
  nameIdCy: string,
  validate: RegisterOptions<FieldValues>,
  labelPlaceholderKey: string,
  inputPlaceholderKey?: string,
  type?: InputType,
  readOnly?: boolean,
  disabled?: boolean,
  updateValueOverrideMethod?: (event: any) => void,
}
export function ValidatedTextInput(
  {
    register,
    touchedFields,
    errors,
    setValue,
    nameIdCy,
    validate,
    labelPlaceholderKey,
    inputPlaceholderKey = '',
    type = 'text',
    readOnly = false,
    disabled = false,
    updateValueOverrideMethod,
  }: ValidatedTextInputFieldProps) {

  const updateValueDefaultMethod = event => {
    setValue(nameIdCy, event.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  const updateValue = updateValueOverrideMethod?? updateValueDefaultMethod;
  const placeHolderValue = inputPlaceholderKey ? translate(inputPlaceholderKey) : '';
  const labelName = `${nameIdCy}Label`;

  return (
    <FormGroup>
      <Label id={labelName} for={nameIdCy}>
        {translate(labelPlaceholderKey)}
      </Label>
      <Input
        id={nameIdCy}
        name={nameIdCy}
        placeholder={ placeHolderValue }
        type={type}
        readOnly={readOnly}
        disabled={disabled}
        {...register(nameIdCy, validate)}
        data-cy={nameIdCy}
        valid={touchedFields[nameIdCy] && !errors[nameIdCy]}
        invalid={!touchedFields[nameIdCy] || !!errors[nameIdCy]}
        onChange={updateValue}
      />
      <FormFeedback hidden={!errors[nameIdCy]}>{errors[nameIdCy]?.message}</FormFeedback>
    </FormGroup>
  );
}
