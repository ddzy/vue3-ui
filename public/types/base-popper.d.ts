export type IBasePopperPlacement =
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
export type IBasePopperTheme = 'light' | 'dark';
export type IBasePopperOffset = [number, number];
export type IBasePopperDelay = [number, number];
export type IBasePopperMaxWidth = 'none' | number;
export type IBasePopperModelValue = boolean | null;
export type IBasePopperTrigger =
	| 'mouseenter focus'
	| 'mouseenter click'
	| 'click'
	| 'mouseenter'
	| 'focusin'
	| 'manual';

export interface IBasePopperProps {
	modelValue: IBasePopperModelValue;
	trigger: IBasePopperTrigger;
	placement: IBasePopperPlacement;
	disabled: boolean;
	arrow: boolean;
	delay: IBasePopperDelay;
	content: string;
	theme: IBasePopperTheme;
	offset: IBasePopperOffset;
	maxWidth: IBasePopperMaxWidth;
	zIndex: number;
	title: string;
}
