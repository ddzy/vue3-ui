import { SFCWithInstall } from '@typings/index';

export interface IBackdropProps {
  modelValue: boolean;
  fixed: boolean;
  customClass: string;
  center: boolean;
}
export const V3Backdrop: SFCWithInstall<IBackdropProps>