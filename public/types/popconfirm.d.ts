import * as BASE_POPPER_TYPES from './base-popper';

export type IPopconfirmTheme = BASE_POPPER_TYPES.IBasePopperTheme;

export interface IPopconfirmProps {
  theme: IPopconfirmTheme;
  title: string;
}
