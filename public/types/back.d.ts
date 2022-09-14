export interface IBackProps {
  distance: number;
  showTop: boolean;
  showBottom: boolean;
  target: IBackTarget;
}
export type IBackTarget = HTMLElement | Window