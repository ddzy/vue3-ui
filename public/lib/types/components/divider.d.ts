import { SFCWithInstall } from '../utils/util';

export type IDividerDirection = 'vertical' | 'horizontal';
export type IDividerContentPosition = 'start' | 'end' | 'center';

export interface IDividerProps {
	direction: IDividerDirection;
	contentPosition: IDividerContentPosition;
}

export declare const V3Divider: SFCWithInstall<IDividerProps>