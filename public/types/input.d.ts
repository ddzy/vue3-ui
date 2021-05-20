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

export type ITextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';
export interface ITextareaProps {
  width: number;
  height: number;
  resize: ITextareaResize;
  autoHeight: boolean;
  disabled: boolean;
  readonly: boolean;
  placeholder: string;
  modelValue: string;
}

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