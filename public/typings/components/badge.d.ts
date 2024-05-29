import { SFCWithInstall } from '../index';

export type IBadgeValue = number | string;
export type IBadgeType = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export interface IBadgeProps {
	value?: IBadgeValue;
	type?: IBadgeType;
	backgroundColor?: string;
	color?: string;
	max?: number;
	dot?: boolean;
}
export const V3Badge: SFCWithInstall<IBadgeProps>;
