import { App, ComponentPublicInstance } from 'vue';

export type ILoadingConstructorReturn = ComponentPublicInstance<ILoadingProps>;
export interface ILoadingProps {}
export interface ILoadingConstructor {
	(options: ILoadingProps): ILoadingConstructorReturn;

	// 服务方式调用
	service: (options: ILoadingProps) => ILoadingConstructorReturn;
	install: (app: App) => void;
}
