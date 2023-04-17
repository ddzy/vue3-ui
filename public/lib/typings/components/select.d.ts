import { SFCWithInstall } from '../index';

export type IBaseSelectValue = string | boolean | number | object;
export type ISelectValue = IBaseSelectValue | IBaseSelectValue[];
export type ISelectOptionValue = IBaseSelectValue;
export type ISelectFilterMethod = (keyword: string) => void | null;
export type ISelectRemoteMethod = (keyword: string) => void | null;
export type ISelectSize = 'small' | 'medium' | 'large';
export interface ISelectProps {
	modelValue: ISelectValue;
	multiple: boolean;
	disabled: boolean;
	valueKey: string;
	clearable: boolean;
	collapseTags: boolean;
	multipleLimit: number;
	placeholder: string;
	remotePlaceholder: string;
	filterable: boolean;
	filterMethod: ISelectFilterMethod;
	remote: boolean;
	remoteMethod: ISelectRemoteMethod;
	loading: boolean;
	loadingText: string;
	noMatchText: string;
	noDataText: string;
	size: ISelectSize;
}

export interface ISelectOptionProps {
	label: string;
	value: ISelectValue;
	disabled: boolean;
}

export const V3Select: SFCWithInstall<ISelectProps>
export const V3SelectOption: SFCWithInstall<ISelectOptionProps>