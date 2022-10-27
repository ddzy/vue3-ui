import { SFCWithInstall } from '../utils/util';

export type IRadioLabel = boolean | string | number;
export type IRadioGroupCallback = () => void | undefined;
export type IRadioSize = 'small' | 'medium' | 'large';

export interface IRadioProps {
	border: boolean;
	disabled: boolean;
	label: IRadioLabel;
  modelValue: IRadioLabel;
  size: IRadioSize;
}
export interface IRadioButtonProps {
	disabled: boolean;
	label: IRadioLabel;
	modelValue: IRadioLabel;
	size: IRadioSize;
}
export interface IRadioGroupProps {
	modelValue: IRadioLabel;
}

export declare const V3Radio: SFCWithInstall<IRadioProps>
export declare const V3RadioButton: SFCWithInstall<IRadioButtonProps>
export declare const V3RadioGroup: SFCWithInstall<IRadioGroupProps>
