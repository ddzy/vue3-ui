import { DeepReadonly } from 'vue';

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
export type ITabModelValue = string | number;
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
	updateTabPanes: (v: ITabPaneProvide) => void;
	updateTabHeight: (v: number) => void;
}
export interface ITabPaneProvide {
	props: DeepReadonly<ITabPaneProps>;
	updateActive: (v: boolean) => void;
}
