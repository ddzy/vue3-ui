import { SFCWithInstall } from '../utils/util';

export type ICheckboxLabel = string | boolean | number;
export type ICheckboxSize = 'small' | 'medium' | 'large';
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
  size: ICheckboxSize;
  modelValue: boolean;
}
export interface ICheckboxButtonProps {
  disabled: boolean;
  label: ICheckboxLabel;
  size: ICheckboxSize;
  modelValue: ICheckboxLabel;
}
export interface ICheckboxGroupProps {
  min: ICheckboxGroupMin;
  max: ICheckboxGroupMax;
  modelValue: ICheckboxLabel[];
}

export declare const V3Checkbox: SFCWithInstall<ICheckboxProps>
export declare const V3CheckboxGroup: SFCWithInstall<ICheckboxGroupProps>