// @ts-nocheck

import * as TYPES from '@/public/types/loading';
import { isStrictObject } from '@common/utils';
import {
	ComponentInternalInstance,
	ComponentPublicInstance,
	createVNode,
	reactive,
	render,
	FunctionDirective,
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

/**
 * 使用方式：实例调用
 * @param options 配置项
 * @returns
 */
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
/**
 * 使用方式：自定义指令
 */
const LoadingDirective: {
	name: string;
	directive: FunctionDirective;
} = {
	name: 'loading',
	directive: (el, binding, vnode) => {
		// v-loading=true/false
		if (typeof binding.value === 'boolean') {
		} else if (isStrictObject(binding.value)) {
			// v-loading={ loading: xxx, content: xxx }
		}
	},
};

/**
 * loading 销毁处理器
 * @param instance loading 组件实例
 */
function close(instance: ComponentPublicInstance) {
	state.loadingList.forEach((loading, index) => {
		if (instance === loading) {
			// 关闭 loading 并从 loading 队列中移除
			loading.state.isShow = false;
			state.loadingList.splice(index, 1);
			// 移除滚动穿透类
			document.body.classList.remove('v3-body--fixed');
		}
	});
}

export default LoadingConstructor;
export { LoadingDirective, close };
