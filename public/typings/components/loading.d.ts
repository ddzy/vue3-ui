import { App, ComponentPublicInstance, VNode } from 'vue';
import { FactoryWithInstall } from '../index';

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

export function useLoading(
	options: ILoadingProps
): ILoadingConstructorReturn;
export const V3Loading: FactoryWithInstall<ILoadingConstructor>;
