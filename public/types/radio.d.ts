export type IRadioLabel = boolean | string | number;
export type IRadioGroupCallback = () => void | undefined;

export interface IRadioProps {
  border: boolean;
  disabled: boolean;
  label: IRadioLabel;
  modelValue: IRadioLabel;
}
export interface IRadioButtonProps {
  disabled: boolean;
  label: IRadioLabel;
  modelValue: IRadioLabel;
}