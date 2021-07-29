import * as BASE_POPPER_TYPES from './base-popper';
import * as BUTTON_TYPES from './button';

export type IPopconfirmTheme = BASE_POPPER_TYPES.IBasePopperTheme;
export type IButtonType = BUTTON_TYPES.IButtonType
export type IButtonSize = BUTTON_TYPES.IButtonSize;

export interface IPopconfirmProps {
  theme: IPopconfirmTheme;
  title: string;
  confirmBtnText: string;
  confirmBtnType: IButtonType;
  confirmBtnSize: IButtonSize;
  confirmBtnLoading: boolean;
  cancelBtnSize: IButtonSize;
  cancelBtnText: string;
  cancelBtnType: IButtonType;
  cancelBtnLoading: boolean;
  icon: string;
  iconColor: string;
  showIcon: boolean;
  content: string;
}
