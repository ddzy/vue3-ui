import { SFCWithInstall } from '../index';

export interface IBackdropProps {
	modelValue: boolean;
	fixed?: boolean;
	customClass?: string;
	center?: boolean;
	closeOnClick?: boolean;
}
export const V3Backdrop: SFCWithInstall<IBackdropProps>;
