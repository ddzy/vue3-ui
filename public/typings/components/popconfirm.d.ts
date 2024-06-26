import { IBasePopperTheme } from './base-popper';
import { IButtonType, IButtonSize } from './button';
import { SFCWithInstall } from '../index';

export interface IPopconfirmProps {
	theme?: IBasePopperTheme;
	title?: string;
	confirmBtnText?: string;
	confirmBtnType?: IButtonType;
	confirmBtnSize?: IButtonSize;
	confirmBtnLoading?: boolean;
	cancelBtnSize?: IButtonSize;
	cancelBtnText?: string;
	cancelBtnType?: IButtonType;
	cancelBtnLoading?: boolean;
	icon?: string;
	iconColor?: string;
	showIcon?: boolean;
	content?: string;
}

export const V3Popconfirm: SFCWithInstall<IPopconfirmProps>;
