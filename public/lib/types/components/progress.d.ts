import { SFCWithInstall } from '../utils/util';

export type IProgressTheme = 'primary' | 'success' | 'danger' | 'warning';
export type IProgressFormatLabel = (percent: number) => any;

export interface IProgressProps {
	percent: number;
	theme: IProgressTheme;
	trackWidth: number;
	trackColor: string;
	doneTrackColor: string;
	showLabel: boolean;
	formatLabel: IProgressFormatLabel;
}
export interface IProgressLinearProps extends IProgressProps {
	width: string;
	animation: boolean;
	round: boolean;
	roundLength: string;
}
export interface IProgressCircularProps extends IProgressProps {
	radius: number;
	rotate: number;
}

export declare const V3ProgressLinear: SFCWithInstall<IProgressLinearProps>
export declare const V3ProgressCircular: SFCWithInstall<IProgressCircularProps>