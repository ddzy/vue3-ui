export interface ICardBodyStyle {
	[key: string]: string | number;
}
export type ICardShadowTrigger = 'hover' | 'alway' | 'never';

export interface ICardProps {
	title: string;
	bodyStyle: ICardBodyStyle;
	shadowTrigger: ICardShadowTrigger;
}
