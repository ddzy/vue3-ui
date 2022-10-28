import { IButtonProps } from './button';
import { SFCWithInstall } from '@felibrary/vue3-ui';

export interface IDialogProps {
	modelValue: boolean;
	title: string;
	width: string;
	center: boolean;
	top: string;
	fullscreen: boolean;
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
	buttonProps: IButtonProps;
	handler: (...args: any[]) => void;
}

export declare const V3Dialog: SFCWithInstall<IDialogProps>