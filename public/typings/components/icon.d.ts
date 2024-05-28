import {
	IIconAllProps as IIconParkProps,
	IconType as IIconParkType,
} from '@icon-park/vue-next/es/all';
import { SFCWithInstall } from '../index';

export interface IIconProps extends IIconParkProps {}
export type IIconType = IIconParkType | string;

export const V3Icon: SFCWithInstall<IIconProps>;
