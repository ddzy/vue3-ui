import { SFCWithInstall } from '@typings/index';

export interface IDrawerProps {
	modelValue: boolean;
	placement: IDrawerPlacement;
	title: string;
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
export type IDrawerOnConfirm = (done: Function) => void;
export type IDrawerOnCancel = (done: Function) => void;

export const V3Drawer: SFCWithInstall<IDrawerProps>