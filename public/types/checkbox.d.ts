export type ICheckboxLabel = string | boolean | number;

export type ICheckboxGroupMin = number;
export type ICheckboxGroupMax = number;

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
