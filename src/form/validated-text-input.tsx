import React from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { InputType } from "reactstrap/types/lib/Input";
import { translate } from "../language";


export interface ValidatedTextInputFieldProps {
  register:  UseFormRegister<FieldValues>,
  touchedFields: any, errors,
  setValue: UseFormSetValue<FieldValues>,
  name: string,
  validation: { required?: boolean | string, minLength?: { value: number, message: string }, maxLength?: { value: number, message: string }, validate?: (value: string) => boolean | string },
  labelPlaceholderKey: string,
  inputPlaceholderKey: string,
  type: InputType,
  updateValueOverrideMethod?: (event: any) => void,
}
export function ValidatedTextInput(
  {
    register,
    touchedFields,
    errors,
    setValue,
    name,
    validation,
    labelPlaceholderKey,
    inputPlaceholderKey,
    type = 'text',
    updateValueOverrideMethod,
  }: ValidatedTextInputFieldProps) {

  const updateValueDefaultMethod = event => {
    setValue(name, event.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  const updateValue = updateValueOverrideMethod?? updateValueDefaultMethod;

  const labelName = `${name}Label`;

  return (
    <FormGroup>
      <Label id={labelName} for={name}>
        {translate(labelPlaceholderKey)}
      </Label>
      <Input
        id={name}
        name={name}
        placeholder={ translate(inputPlaceholderKey) }
        type={type}
        {...register(name, validation)}
        data-cy={name}
        valid={touchedFields[name] && !errors[name]}
        invalid={!touchedFields[name] || !!errors[name]}
        onChange={updateValue}
      />
      <FormFeedback hidden={!errors[name]}>{errors[name]?.message}</FormFeedback>
    </FormGroup>
  );
}
