import { Ref } from 'vue';

export interface ITabProps {
	modelValue?: string | number;
	type?: ITabType;
	addable?: boolean;
	closable?: boolean;
	size?: ITabSize;
	trigger?: ITabTrigger;
	placement?: ITabPlacement;
	showHeader?: boolean;
	centeredHeader?: boolean;
}
export type ITabType = 'bar' | 'line' | 'card';
export type ITabSize = 'small' | 'medium' | 'large';
export type ITabTrigger = 'click' | 'hover';
export type ITabPlacement = 'left' | 'top' | 'right' | 'bottom';

export interface ITabPaneProps {
	name: string | number;
	title?: string;
	disabled?: boolean;
	closable?: boolean;
}

export interface ITabProvide {
	tabPanes: Ref<ITabPaneProvide[]>;
}
export interface ITabPaneProvide {
	props: ITabPaneProps;
}
