export type ISliderModelValue = [number, number] | number;
export type ISliderFormatTooltip = (modelValue: number) => any;

export interface ISliderMarkItemValue {
	label: string;
	style: {
		[key: string]: string;
	};
}
export interface ISliderMarkItem {
	[key: number]: ISliderMarkItemValue;
}

export interface ISliderProps {
	modelValue: ISliderModelValue;
	min: number;
	max: number;
	disabled: boolean;
	step: number;
	showMark: boolean;
	showTooltip: boolean;
	showTooltipAlways: boolean;
	formatTooltip: ISliderFormatTooltip;
	range: boolean;
	vertical: boolean;
	height: string;
	label: string;
	prependIcon: string;
	appendIcon: string;
	customTooltipClass: string;
	marks: ISliderMarkItem;
}
