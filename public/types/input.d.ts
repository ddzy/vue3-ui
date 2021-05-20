export type IInputType = 'text' | 'password';

export interface IInputProps {
  type: IInputType;
  suffixIcon: string;
  prefixIcon: string;
  prependIcon: string;
  appendIcon: string;
  clearable: boolean;
  readonly: boolean;
  disabled: boolean;
  showWordLimit: boolean;
  minlength: number;
  maxlength: number;
  placeholder: string;
  showPassword: boolean;
  modelValue: string;
}

export type ITextareaWidth = number;
export type ITextareaHeight = number;
export type ITextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';
export type ITextareaAutoHeight = boolean;
export type ITextareaDisabled = boolean;
export type ITextareaReadonly = boolean;
export type ITextareaPlaceholder = string;

export type INumberMin = number | undefined;
export type INumberMax = number | undefined;
export type INumberControlsPosition = 'both' | 'right' | 'left';
export interface IInputNumberProps {
  min: INumberMin;
  max: INumberMax;
  step: number;
  stepStrictly: boolean;
  precision: number;
  disabled: boolean;
  readonly: boolean;
  controlsPosition: INumberControlsPosition;
  placeholder: string;
  modelValue: number;
}