import { SFCWithInstall } from '../utils/util';

export type IButtonType =
	| 'primary'
	| 'success'
	| 'danger'
	| 'default'
	| 'warning'
	| 'info'
	| 'text';
export type IButtonNativeType = 'button' | 'submit' | 'reset' | 'menu';
export type IButtonBorderType =
	| 'solid'
	| 'dashed'
	| 'dotted'
	| 'double'
	| 'groove'
	| 'outset';
export type IButtonSize = 'small' | 'medium' | 'large';
export interface IButtonProps {
	type: IButtonType;
	nativeType: IButtonNativeType;
	borderType: IButtonBorderType;
	disabled: boolean;
	plain: boolean;
	icon: string;
	circle: boolean;
	loading: boolean;
	size: IButtonSize;
}
export declare const V3Button: SFCWithInstall<IButtonProps>