import { SFCWithInstall } from '../utils/util';

export interface ICardBodyStyle {
	[key: string]: string | number;
}
export type ICardShadowTrigger = 'hover' | 'alway' | 'never';
export type ICardShadowSize = 'small' | 'medium' | 'large';

export interface ICardProps {
	title: string;
	bodyStyle: ICardBodyStyle;
	shadowTrigger: ICardShadowTrigger;
	shadowSize: ICardShadowSize;
}
export declare const V3Card: SFCWithInstall<ICardProps>