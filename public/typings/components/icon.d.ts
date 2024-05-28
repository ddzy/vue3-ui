import { IconType as IIconParkType } from '@icon-park/vue-next/es/all';
import { SFCWithInstall } from '../index';

export interface IIconProps {
	type: IIconType;
	spin?: boolean;
	size?: number | string;
	strokeWidth?: number;
	strokeLinecap?: IIconStrokeLinecap;
	strokeLinejoin?: IIconStrokeLinejoin;
	theme?: IIconTheme;
	fill?: string | string[];
}
export type IIconType = IIconParkType | string;
export type IIconStrokeLinecap = 'butt' | 'round' | 'square';
export type IIconStrokeLinejoin = 'miter' | 'round' | 'bevel';
export type IIconTheme = 'outline' | 'filled' | 'two-tone' | 'multi-color';
export type IIconFill = string | string[];

export const V3Icon: SFCWithInstall<IIconProps>;
