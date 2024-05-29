import { SFCWithInstall } from '../index';

export interface IDemoBlockExtraItem {
	icon: string;
	title: string;
	action?: string;
}
export interface IDemoBlockProps {
	descriptionTip?: string;
	expandedBtnText?: string;
	defaultBtnText?: string;
	extraList?: IDemoBlockExtraItem[];
}

export const V3DemoBlock: SFCWithInstall<IDemoBlockProps>;
