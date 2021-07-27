export type IBasePopperTrigger = 'click' | 'hover';
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
export type IBasePopperDelay = number[];

export interface IBasePopperProps {
  modelValue: boolean | null;
	trigger: IBasePopperTrigger;
	placement: IBasePopperPlacement;
	disabled: boolean;
	arrow: boolean;
	delay: IBasePopperDelay;
	content: string;
	theme: IBasePopperTheme;
	offset: number;
	maxWidth: number;
}
