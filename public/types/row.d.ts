export type IRowGutter = number;
export type IRowType = 'flex';
export type IRowJustify =
	| 'start'
	| 'end'
	| 'center'
	| 'space-around'
	| 'space-between'
	| 'flex-start'
	| 'flex-end';
export type IRowAlign = 'start' | 'end' | 'center' | 'flex-start' | 'flex-end';
export interface IRowProps {
	gutter: IRowGutter;
	type: IRowType;
	justify: IRowJustify;
	align: IRowAlign;
}

export interface IColBaseOption {
	span: IColSpan;
	offset: IColOffset;
	push: IColPush;
	IColPull: IColPull;
}
export type IColSpan = number;
export type IColOffset = number;
export type IColPush = number;
export type IColPull = number;
export type IColXS = number | IColBaseOption;
export type IColSM = number | IColBaseOption;
export type IColMD = number | IColBaseOption;
export type IColLG = number | IColBaseOption;
export type IColXL = number | IColBaseOption;
export interface IColProps {
  span: IColSpan;
  offset: IColOffset;
  push: IColPush;
  pull: IColPull;
  xs: IColXS;
  sm: IColSM;
  md: IColMD;
  lg: IColLG;
  xl: IColXL;
}