import { SFCWithInstall } from '../index';

export type IButtonType =
	| 'primary'
	| 'success'
	| 'danger'
	| 'default'
	| 'warning'
	| 'info'
	| 'text';
export type IButtonNativeType = 'button' | 'submit' | 'reset';
export type IButtonBorderType =
	| 'solid'
	| 'dashed'
	| 'dotted'
	| 'double'
	| 'groove'
	| 'outset';
export type IButtonSize = 'small' | 'medium' | 'large';
export interface IButtonProps {
	type?: IButtonType;
	nativeType?: IButtonNativeType;
	borderType?: IButtonBorderType;
	disabled?: boolean;
	plain?: boolean;
	icon?: string;
	circle?: boolean;
	loading?: boolean;
	size?: IButtonSize;
}
export const V3Button: SFCWithInstall<IButtonProps>;
