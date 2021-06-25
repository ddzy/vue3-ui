export type ITagType =
	| 'primary'
	| 'success'
	| 'danger'
	| 'default'
	| 'warning'
	| 'info';
export type ITagSize = 'small' | 'medium' | 'large';
export interface ITagProps {
	type: ITagType;
	closeable: boolean;
	plain: boolean;
	size: ITagSize;
	backgroundColor: string;
	color: string;
}
