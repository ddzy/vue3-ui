import { SFCWithInstall } from '../index';

export interface IWatermarkProps {
  content: string | string[];
  width?: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
  image?: string;
  font?: IWatermarkFont;
  gap?: IWatermarkGap;
  offset?: IWatermarkOffset;
  fullscreen?: boolean;
}
export interface IWatermarkFont {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
}
export type IWatermarkGap = number | { x?: number, y?: number };
export type IWatermarkOffset = number | { x?: number, y?: number }

export const V3Watermark: SFCWithInstall<IWatermarkProps>;
