import { SFCWithInstall } from '@typings/index';

export type ITagType = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type ITagSize = 'small' | 'medium' | 'large';
export interface ITagProps {
	type: ITagType;
	closeable: boolean;
	plain: boolean;
	size: ITagSize;
	backgroundColor: string;
	color: string;
	borderColor: string;
	animation: boolean;
}

export const V3Tag: SFCWithInstall<ITagProps>