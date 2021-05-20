export type ICheckboxBorder = boolean;
export type ICheckboxLabel = string | boolean | number;
export type ICheckboxIndeterminate = boolean;
export type ICheckboxSelectedIcon = string;
export type ICheckboxDefaultIcon = string;
export type ICheckboxIndeterminatedIcon = string;
export type ICheckboxDisabled = boolean;

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
