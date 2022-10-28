import { SFCWithInstall } from '@felibrary/vue3-ui';

export type IDividerDirection = 'vertical' | 'horizontal';
export type IDividerContentPosition = 'start' | 'end' | 'center';

export interface IDividerProps {
	direction: IDividerDirection;
	contentPosition: IDividerContentPosition;
}

export declare const V3Divider: SFCWithInstall<IDividerProps>