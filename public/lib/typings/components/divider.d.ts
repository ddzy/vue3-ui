import { SFCWithInstall } from '@typings/index';

export type IDividerDirection = 'vertical' | 'horizontal';
export type IDividerContentPosition = 'start' | 'end' | 'center';

export interface IDividerProps {
	direction: IDividerDirection;
	contentPosition: IDividerContentPosition;
}

export const V3Divider: SFCWithInstall<IDividerProps>