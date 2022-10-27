import { SFCWithInstall } from '../utils/util';

export interface IBackProps {
  distance: number;
  disableToTop: boolean;
  disableToBottom: boolean;
  target: IBackTarget;
}
export type IBackTarget = HTMLElement | Window
export declare const V3Back: SFCWithInstall<IBackProps>