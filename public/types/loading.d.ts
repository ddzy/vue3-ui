import { App, ComponentPublicInstance, VNode } from 'vue';

export type ILoadingConstructorReturn = ComponentPublicInstance<
	ILoadingProps & {
		close: () => void;
	}
>;
export type ILoadingContent = string | VNode;
export interface ILoadingProps {
	fullscreen?: boolean;
	fixed?: boolean;
	content?: ILoadingContent;
	backgroundColor?: string;
	color?: string;
	customClass?: string;
}
export interface ILoadingConstructor {
	(options: ILoadingProps): ILoadingConstructorReturn;

	// 服务方式调用
	service: (options: ILoadingProps) => ILoadingConstructorReturn;
	install: (app: App) => void;
}
