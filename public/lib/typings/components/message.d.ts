import { App, ComponentPublicInstance, VNode } from 'vue';
import { FactoryWithInstall } from '@typings/index';

export interface IMessageProps {
	duration?: number;
	type?: IMessageType;
	message?: IMessageMessage;
	icon?: string;
	dangerouslyUseHTMLString?: boolean;
	customClass?: string;
	showClose?: boolean;
	center?: boolean;
	offset?: number;
	closeOnHover?: boolean;
	onClose?: IMessageOnClose;
}
export type IMessageType = 'success' | 'warning' | 'info' | 'danger';
export type IMessageMessage = string | VNode;
export type IMessageOnClose = (done: () => void) => void;

export type IMessageConstructorReturn = ComponentPublicInstance<IMessageProps>;
export type IMessageConstructorMethod = Omit<IMessageProps, 'type'> & {
	type?: IMessageType;
};
export interface IMessageConstructor {
	(options: IMessageProps): IMessageConstructorReturn;

	success: (options: IMessageConstructorMethod) => IMessageConstructorReturn;
	warning: (options: IMessageConstructorMethod) => IMessageConstructorReturn;
	info: (options: IMessageConstructorMethod) => IMessageConstructorReturn;
	danger: (options: IMessageConstructorMethod) => IMessageConstructorReturn;

	install: (app: App) => void;
}
export type V3MessageService = Omit<IMessageConstructor, 'install'>;
export type V3MessageHook = (
	options: IMessageProps
) => IMessageConstructorReturn;
export const V3Message: FactoryWithInstall<IMessageConstructor>;
