export interface ICollapseProps {
	modelValue?: ICollapseModelValue;
	accordion?: boolean;
	plain?: boolean;
	displayStrategy?: ICollapseDisplayStrategy;
	arrowPlacement?: ICollapseArrowPlacement;
	triggerArea?: ICollapseTriggerArea;
}
export type ICollapseModelValue = string | string[] | number | number[];
export type ICollapseDisplayStrategy = 'if' | 'show';
export type ICollapseArrowPlacement = 'start' | 'end';
export type ICollapseTriggerArea = Array<'icon' | 'title' | 'extra'>;

export interface ICollapseItemProps {
	name?: string | number;
	title?: string;
	disabled?: boolean;
	displayStrategy?: ICollapseDisplayStrategy;
}

export interface ICollapseProvide {
	props: ICollapseProps;
	addCollapseItem: (v: ICollapseItemProvide) => void;
}
export interface ICollapseItemProvide {
	props: ICollapseItemProps;
	updateActive: (v: boolean) => void;
}
