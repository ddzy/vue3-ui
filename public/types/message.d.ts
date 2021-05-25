import { ComponentPublicInstance, VNode } from 'vue';

export interface IMessageProps {
	duration: number;
	type: IMessageType;
	message: IMessageMessage;
	icon: string;
	dangerouslyUseHTMLString: boolean;
	customClass: string;
	showClose: boolean;
	center: boolean;
	offset: number;
	closeOnHover: boolean;
	onClose: IMessageOnClose;
}
export type IMessageType = 'success' | 'warning' | 'info' | 'danger';
export type IMessageMessage = string | VNode;
export type IMessageOnClose = (instance: ComponentPublicInstance) => boolean | Promise<boolean>;

export type IMessageContructor = (
	options: Partial<IMessageProps>
) => ComponentPublicInstance<
	IMessageProps,
	{
		close: () => void;
	}
>;
