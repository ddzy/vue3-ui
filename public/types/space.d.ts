import { VNode } from 'vue';

export type ISpaceAlign =
	| 'start'
	| 'end'
	| 'center'
	| 'flex-start'
	| 'flex-end';
export type ISpaceDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type ISpaceSeparator = VNode | string;

export interface ISpaceProps {
	customClass: string;
	align: ISpaceAlign;
  direction: ISpaceDirection;
  wrap: boolean;
  separator: ISpaceSeparator;
  size: number;
}
