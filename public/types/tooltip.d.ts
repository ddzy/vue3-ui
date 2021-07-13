export type ITooltipTheme = 'dark' | 'light';
export type ITooltipPlacement =
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
export type ITooltipOffset = [number, number];
export type ITooltipDelay = [number, number];

export interface ITooltipProps {
	modelValue: boolean;
	theme: ITooltipTheme;
	content: string;
	placement: ITooltipPlacement;
	disabled: boolean;
	offset: ITooltipOffset;
	animation: string;
	delay: ITooltipDelay;
	trigger: string;
}
