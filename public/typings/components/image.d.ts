import { SFCWithInstall } from '../index';

export interface IImageProps {
	src: string;
	previewSrc?: string;
	preview?: boolean;
	width?: string | number;
	height?: string | number;
	lazy?: boolean;
	animated?: boolean;
	lazyOptions?: IImageLazyOptions;
	objectFit?: IImageObjectFit;
	showToolbar?: boolean;
	showLoading?: boolean;
	rounded?: boolean;
	radius?: string | number;
}
export interface IImageLazyOptions {
	useIntersectionObserver?: boolean;
	intersectionRoot?: Element | Document | null;
	intersectionRootMargin?: string;
	intersectionThreshold?: number | number[];
}
export type IImageObjectFit =
	| 'fill'
	| 'contain'
	| 'cover'
	| 'scale-down'
	| 'none';

export const V3Image: SFCWithInstall<IImageProps>;
