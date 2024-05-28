import { SFCWithInstall } from '../index';

export interface IBackProps {
  distance: number;
  disableToTop: boolean;
  disableToBottom: boolean;
  target: IBackTarget;
}
export type IBackTarget = HTMLElement | Window
export const V3Back: SFCWithInstall<IBackProps>