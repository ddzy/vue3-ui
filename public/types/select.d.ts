export type ISelectValue = string | boolean | number | object;
export type ISelectFilterMethod = () => void;
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
