export type IProgressTheme = 'primary' | 'success' | 'danger' | 'warning';
export type IProgressFormatLabel = (percent: number) => any;

export interface IProgressProps {
	percent: number;
	theme: IProgressTheme;
	trackWidth: string;
	trackColor: string;
	doneTrackColor: string;
	showLabel: boolean;
	formatLabel: IProgressFormatLabel;
}
export interface IProgressLinearProps extends IProgressProps {
	width: string;
	animation: boolean;
}
export interface IProgressCircularProps extends IProgressProps {
	radius: string;
}
