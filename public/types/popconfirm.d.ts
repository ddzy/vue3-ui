import * as BASE_POPPER_TYPES from './base-popper';
import * as BUTTON_TYPES from './button';

export type IPopconfirmTheme = BASE_POPPER_TYPES.IBasePopperTheme;
export type IButtonType = BUTTON_TYPES.IButtonType

export interface IPopconfirmProps {
  theme: IPopconfirmTheme;
  title: string;
  confirmBtnText: string;
  confirmBtnType: IButtonType;
  cancelBtnText: string;
  cancelBtnType: IButtonType;
  icon: string;
  iconColor: string;
  showIcon: boolean;
}
