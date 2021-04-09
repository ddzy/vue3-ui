export type IButtonType =
	| 'primary'
	| 'success'
	| 'danger'
	| 'default'
	| 'warning';
export type IButtonNativeType = 'button' | 'submit' | 'reset' | 'menu';

export interface IButtonProps {
	type?: IButtonType;
	nativeType?: IButtonNativeType;
}
