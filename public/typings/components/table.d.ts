export interface ITableProps {
	data?: any[];
	border?: boolean;
	stripe?: boolean;
	height?: string | number;
	maxHeight?: string | number;
	size?: ITableSize;
	showHeader?: boolean;
	highlightCurrentRow?: boolean;
	rowClassName?: ITableRowClassName;
	cellClassName?: ITableCellClassName;
	headerRowClassName?: ITableRowClassName;
	headerCellClassName?: ITableCellClassName;
	rowKey?: string | ((data: { row: any; rowIndex: number }) => string);
	emptyText?: string;
}
export type ITableSize = 'small' | 'medium' | 'large';
export type ITableRowClassName =
	| string
	| ((data: { row: any; rowIndex: number }) => string);
export type ITableCellClassName =
	| string
	| ((data: {
			row: any;
			column: ITableColumnProps;
			rowIndex: number;
			columnIndex: number;
	  }) => string);

export interface ITableColumnProps {
	prop?: string;
	label?: string;
	type?: ITableColumnType;
	align?: ITableAlign;
	headerAlign?: ITableAlign;
	width?: string | number;
	minWidth?: string | number;
	fixed?: boolean;
	sortable?: ITableColumnSortable;
	sortMethod?: <T = any>(a: T, b: T) => number;
	resizable?: boolean;
	formatter?: (row: any) => any;
	className?: string;
	labelClassName?: string;
}
export type ITableColumnType =
	| 'default'
	| 'checkbox'
	| 'radio'
	| 'index'
	| 'expand';
export type ITableAlign = 'left' | 'center' | 'right';
export type ITableColumnSortable = boolean | 'custom';
