import * as ButtonTypes from '@/public/types/button';

export interface IDialogProps {
	modelValue: boolean;
	title: string;
	width: string;
	center: boolean;
	fullscreen: boolean;
	backdrop: boolean;
	fixed: boolean;
	customClass: string;
	closeOnClickBackdrop: boolean;
	showClose: boolean;
	headerActions: IDialogHeaderActionItem[];
	beforeClose: IDialogBeforeClose;
}
export type IDialogBeforeClose = (done: () => void) => void;
export interface IDialogHeaderActionItem {
	text: string;
	buttonProps: ButtonTypes.IButtonProps;
	handler: (...args: any[]) => void;
}
