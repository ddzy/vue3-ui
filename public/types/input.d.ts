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

export type INumberMin = number;
export type INumberMax = number;
export type INumberStep = number;
export type INumberStepStrictly = boolean;
export type INumberPrecision = number;
export type INumberDisabled = boolean;
export type INumberReadonly = boolean;
export type INumberControlsPosition = 'both' | 'right' | 'left';
export type INumberPlaceholder = string;
