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
	treeMethod?: ITableTreeMethod;
}
export type ITableData = any;
export type ITableSize = 'small' | 'medium' | 'large';
export type ITableRowClassName =
	| string
	| ((data: { row: ITableData; rowIndex: number }) => string);
export type ITableCellClassName =
	| string
	| ((data: {
			row: ITableData;
			column: ITableColumnProps;
			rowIndex: number;
			columnIndex: number;
	  }) => string);
export type ITableBaseRowKey = string | number | symbol;
export type ITableRowKey = ITableBaseRowKey | ((data: { row: ITableData; rowIndex: number }) => ITableBaseRowKey);
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
export type ITableTreeMethod = (options: { row: ITableData, node: ITableTreeNode, resolve: (data: ITableData[]) => void }) => void;
export interface ITableTreeNode {
	key: ITableBaseRowKey;
	level: number;
	root: boolean;
	expanded: boolean;
	loading: boolean;
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
	formatter?: (row: ITableData) => any;
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