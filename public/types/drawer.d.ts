export interface IDrawerProps {
	modelValue: boolean;
	placement: IDrawerPlacement;
	title: string;
	showBackdrop: boolean;
	showClose: boolean;
	closeOnClickBackdrop: boolean;
	confirmText: string;
	cancelText: string;
	showConfirm: boolean;
	showCancel: boolean;
	confirmLoading: boolean;
	width: string | number;
	height: string | number;
	onConfirm: IDrawerOnConfirm;
	onCancel: IDrawerOnCancel;
}
export type IDrawerPlacement = 'top' | 'left' | 'bottom' | 'right';
export type IDrawerOnConfirm = () => void;
export type IDrawerOnCancel = (done: Function) => void;
