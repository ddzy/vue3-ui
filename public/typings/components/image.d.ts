export interface IImageProps {
	src: string;
	previewSrc?: string;
	previewDisabled?: boolean;
	fallbackSrc?: string;
	width?: string | number;
	height?: string | number;
	lazy?: boolean;
	objectFit?: IImageObjectFit;
	showToolbar?: boolean;
	rounded?: boolean;
}
export type IImageObjectFit =
	| 'fill'
	| 'contain'
	| 'cover'
	| 'scale-down'
	| 'none';
