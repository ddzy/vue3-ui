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
export type IButtonPlain = boolean | undefined;
export type IButtonDisabled = boolean | undefined;
export type IButtonIcon = string | undefined;
export type IButtonCircle = boolean | undefined;
export type IButtonLoading = boolean;
