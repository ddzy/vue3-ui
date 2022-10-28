import { App, ComponentPublicInstance, VNode } from 'vue';
import { FactoryWithInstall } from '@felibrary/vue3-ui';

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

	install: (app: App) => void;
}
export type V3LoadingService = Omit<ILoadingConstructor, 'install'>;
export type V3LoadingHook = (
	options: ILoadingProps
) => ILoadingConstructorReturn;

export declare function useLoading(
	options: ILoadingProps
): ILoadingConstructorReturn;
export declare const V3Loading: FactoryWithInstall<ILoadingConstructor>;
