// @ts-nocheck

import * as TYPES from '@/public/types/loading';
import {
	ComponentInternalInstance,
	ComponentPublicInstance,
	createVNode,
	reactive,
	render,
} from 'vue';
import Loading from './Loading.vue';

interface IState {
	loadingList: ComponentPublicInstance<any, any>[];
	instanceWrapper: HTMLElement;
}

const state: IState = reactive({
	/** loading 实例列表 */
	loadingList: [],
	instanceWrapper: document.createElement('div'),
});

const LoadingConstructor: TYPES.ILoadingConstructor = (
	options: TYPES.ILoadingProps
) => {
	const defaultOptions: Required<TYPES.ILoadingProps> = Object.assign(
		{
			fullscreen: false,
			fixed: true,
			content: 'Loading...',
			backgroundColor: '',
			customClass: '',
		},
		options
	);

	// 利用 VNode 的形式来挂载 loading，避免多余的 DOM 元素
	state.instanceWrapper = document.createElement('div');
	const instanceVNode = createVNode(Loading, {
		...defaultOptions,
	});

	render(instanceVNode, state.instanceWrapper);
	document.body.appendChild(
		state.instanceWrapper.firstElementChild as HTMLElement
	);

	// 将当前 loading 实例追加到列表中
	const instance = (instanceVNode.component as ComponentInternalInstance)
		.proxy as ComponentPublicInstance;
	state.loadingList.push(instance);

	return instance;
};

export default LoadingConstructor;
