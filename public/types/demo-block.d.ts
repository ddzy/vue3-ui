export interface IDemoBlockExtraItem {
	icon: string;
	title: string;
	action?: string;
}
export interface IDemoBlockProps {
	descriptionTip: string;
	expandedBtnText: string;
	defaultBtnText: string;
	extraList: IDemoBlockExtraItem[];
}