import { DeepReadonly, Ref } from 'vue';

export interface ITabProps {
	modelValue?: ITabModelValue;
	type?: ITabType;
	addable?: boolean;
	closable?: boolean;
	showClose?: ITabShowClose;
	size?: ITabSize;
	trigger?: ITabTrigger;
	placement?: ITabPlacement;
	showHeader?: boolean;
	centeredHeader?: boolean;
}
export type ITabModelValue = string | number;
export type ITabType = 'bar' | 'line' | 'card';
export type ITabSize = 'small' | 'medium' | 'large';
export type ITabTrigger = 'click' | 'hover';
export type ITabPlacement = 'left' | 'top' | 'right' | 'bottom';
export type ITabShowClose = 'always' | 'active';

export interface ITabPaneProps {
	name: ITabModelValue;
	title?: string;
	disabled?: boolean;
	closable?: boolean;
}

export interface ITabProvide {
	addTabPane: (v: ITabPaneProvide) => void;
	removeTabPane: (v: ITabModelValue) => void;
	updateTabHeight: (v: number) => void;
	updateTabLine: () => void;
	scrollIntoView: (v: ITabModelValue) => Promise<void>;
	canTabNavScroll: Ref<boolean>;
}
export interface ITabPaneProvide {
	props: DeepReadonly<ITabPaneProps>;
	updateActive: (v: boolean) => void;
}
