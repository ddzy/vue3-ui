import { SFCWithInstall } from '../index';

export type ISliderModelValue = [number, number] | number;
export type ISliderFormatTooltip = (modelValue: ISliderModelValue) => any;

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
	showStop: boolean;
	showTooltip: boolean;
	showTooltipAlways: boolean;
	formatTooltip: ISliderFormatTooltip;
	range: boolean;
	vertical: boolean;
	height: string;
	label: string;
	prependIcon: string;
	appendIcon: string;
	marks: ISliderMarkItem;
	thumbColor: string;
	thumbShadowColor: string;
	trackColor: string;
	doneTrackColor: string;
}

export const V3Slider: SFCWithInstall<ISliderProps>