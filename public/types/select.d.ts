export type ISelectValue = string | boolean | number | object;
export type ISelectFilterMethod = (keyword: string) => void | null;
export type ISelectRemoteMethod = (keyword: string) => void;
export interface ISelectProps {
	modelValue: ISelectValue;
	multiple: boolean;
	disabled: boolean;
	valueKey: string;
	clearable: boolean;
	collapseTags: boolean;
	multipleLimit: number;
	placeholder: string;
	filterable: boolean;
	allowCreate: boolean;
	filterMethod: ISelectFilterMethod;
	remote: boolean;
	remoteMethod: ISelectRemoteMethod;
	loading: boolean;
	loadingText: string;
	noMatchText: string;
	noDataText: string;
}

export interface ISelectOptionProps {
  label: string;
  value: ISelectValue;
  disabled: boolean;
}