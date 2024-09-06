import { SFCWithInstall } from "../utils/util";

export interface ITableProps {
	data?: ITableData[];
	columns?: ITableColumn[];
	border?: boolean;
	stripe?: boolean;
	height?: string | number;
	maxHeight?: string | number;
	size?: ITableSize;
	showHeader?: boolean;
	highlightHoverRow?: boolean;
	highlightSelectionRow?: boolean;
	rowClassName?: ITableRowClassName;
	cellClassName?: ITableCellClassName;
	headerRowClassName?: ITableRowClassName;
	headerCellClassName?: ITableCellClassName;
	rowKey?: ITableRowKey;
	emptyText?: string;
	loading?: boolean;
	defaultSort?: ITableDefaultSort;
	treeLazyload?: boolean;
	treeProps?: ITableTreeProps;
}
export type ITableData = any;
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
export type ITableBaseRowKey = string | number | symbol;
export type ITableRowKey = ITableBaseRowKey | ((data: { row: any; rowIndex: number }) => ITableBaseRowKey);
export interface ITableDefaultSort  {
	prop?: string;
	order?: ITableColumnSortBy
}
export type ITableColumn = ITableColumnProps & {
	children?: ITableColumnProps[];
	slot?: string;
}
export type ITableTreeProps = {
	children?: string;
	hasChildren?: string;
}

export interface ITableColumnProps {
	prop?: string;
	label?: string;
	type?: ITableColumnType;
	align?: ITableAlign;
	headerAlign?: ITableAlign;
	width?: string | number;
	minWidth?: string | number;
	fixed?: ITableColumnFixed;
	sortable?: ITableColumnSortable;
	sortBy?: ITableColumnSortBy[];
	resizable?: boolean;
	formatter?: (row: any) => any;
	className?: string;
	labelClassName?: string;
	showOverflowTooltip?: boolean;
}
export type ITableColumnType =
	| 'default'
	| 'checkbox'
	| 'radio'
	| 'index'
	| 'expand';
export type ITableAlign = 'left' | 'center' | 'right';
export type ITableColumnSortable = boolean | 'custom';
export type ITableColumnFixed = boolean | 'left' | 'right';
export type ITableColumnSortBy = 'none' | 'ascending' | 'descending';

export const V3Table: SFCWithInstall<ITableProps>;
export const V3TableColumn: SFCWithInstall<ITableColumnProps>;