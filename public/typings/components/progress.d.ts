import { SFCWithInstall } from '../index';

export type IProgressTheme = 'primary' | 'success' | 'danger' | 'warning';
export type IProgressFormatLabel = (percent: number) => any;

export interface IProgressProps {
	percent: number;
	theme?: IProgressTheme;
	trackWidth?: number | string;
	trackColor?: string;
	doneTrackColor?: string;
	showLabel?: boolean;
	formatLabel?: IProgressFormatLabel;
}
export type IProgressLinearProps = Omit<IProgressProps, 'width'> & {
	width?: string;
	animation?: boolean;
	round?: boolean;
	roundLength?: string;
};
export type IProgressCircularProps = Omit<IProgressProps, 'trackWidth'> & {
	trackWidth?: number;
	radius?: number;
	rotate?: number;
};

export const V3ProgressLinear: SFCWithInstall<IProgressLinearProps>;
export const V3ProgressCircular: SFCWithInstall<IProgressCircularProps>;
