export type IPopoverTheme = 'dark' | 'light';
export type IPopoverPlacement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'right'
	| 'right-start'
	| 'right-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end'
	| 'auto'
	| 'auto-start'
	| 'auto-end';
export type IPopoverOffset = [number, number];
export type IPopoverDelay = [number, number];

export interface IPopoverProps {
	theme: IPopoverTheme;
	content: string;
	title: string;
	placement: IPopoverPlacement;
	disabled: boolean;
	offset: IPopoverOffset;
	animation: string;
	delay: IPopoverDelay;
	trigger: string;
}
