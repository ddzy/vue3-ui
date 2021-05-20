export type ICheckboxLabel = string | boolean | number;

export type ICheckboxGroupMin = number | undefined;
export type ICheckboxGroupMax = number | undefined;

export interface ICheckboxProps {
  border: boolean;
  label: ICheckboxLabel;
  indeterminate: boolean;
  selectedIcon: string;
  defaultIcon: string;
  indeterminatedIcon: string;
  disabled: boolean;
  modelValue: boolean;
}
export interface ICheckboxButtonProps {
  disabled: boolean;
  label: ICheckboxLabel;
  modelValue: ICheckboxLabel;
}
export interface ICheckboxGroupProps {
  min: ICheckboxGroupMin;
  max: ICheckboxGroupMax;
  modelValue: ICheckboxLabel[];
}