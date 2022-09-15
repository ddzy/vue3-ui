export interface IBackProps {
  distance: number;
  disableToTop: boolean;
  disableToBottom: boolean;
  target: IBackTarget;
}
export type IBackTarget = HTMLElement | Window
