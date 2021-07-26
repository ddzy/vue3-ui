// @ts-nocheck

import * as TYPES from '@/public/types/loading';
import { isStrictObject } from '@common/utils';
import {
	ComponentInternalInstance,
	ComponentPublicInstance,
	createVNode,
	FunctionDirective,
	h,
	reactive,
	render,
} from 'vue';
import Loading from './Loading.vue';

interface IState {
	loadingMap: Map<HTMLElement, ComponentPublicInstance<any, any>>;
	loadingSingleInstance: ComponentPublicInstance<any, any> | null;
	instanceWrapper: HTMLElement;
}

const state: IState = reactive({
	/** loading 挂载元素 -> loading 实例映射表 */
	loadingMap: new Map(),
	/** 全屏状态下的 loading 单例 */
	loadingSingleInstance: null,
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
			content: 'Loading...',
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
	state.loadingSingleInstance = instance;

	return state.loadingSingleInstance;
};
/**
 * 使用方式：自定义指令
 */
const LoadingDirective: {
	name: string;
	directive: FunctionDirective<HTMLElement>;
} = {
	name: 'loading',
	directive: (el, binding) => {
		// v-loading=true/false
		if (typeof binding.value === 'boolean') {
			directiveHandler(binding.value, el, {});
		} else if (isStrictObject(binding.value)) {
			// v-loading={ loading: xxx, content: xxx }
			if (!binding.value.hasOwnProperty('loading')) {
				return;
			}

			const options: TYPES.ILoadingProps = {};
			for (const key in binding.value) {
				if (Object.prototype.hasOwnProperty.call(binding.value, key)) {
					const value = binding.value[key];

					if (key !== 'loading' && value) {
						options[key] = value;
					}
				}
			}

			directiveHandler(binding.value.loading, el, options);
		}
	},
};
/**
 * 使用方式：Composition API
 * @param options loading 可配置项
 * @returns loading 实例
 */
const useLoading = (options: TYPES.ILoadingProps) => {
	const instance = LoadingConstructor(options);

	return {
		instance,
	};
};

/**
 * loading 销毁处理器
 */
function close() {
	// 关闭 loading
	state.loadingSingleInstance.state.isShow = false;
	// 删除滚动穿透类
	document.body.classList.remove('v3-body--fixed');
}

/**
 * loading 自定义指令处理器
 * @param isLoading 是否加载中
 * @param el loading 挂载的父元素
 * @param options loading 可配置项（props）
 */
function directiveHandler(
	isLoading: boolean,
	el: HTMLElement,
	options: TYPES.ILoadingProps
) {
	if (isLoading) {
		el.classList.add('v3-loading-parent--relative');

		if (state.loadingMap.has(el)) {
			state.loadingMap.get(el).state.isShow = true;
		} else {
			const loadingVNode = h(Loading, {
				...options,
				style: { position: 'absolute', inset: 0 },
				fullscreen: false,
				fixed: false,
			});
			render(loadingVNode, el);

			// 将当前实例追加到映射表
			if (loadingVNode.component && loadingVNode.component.proxy) {
				state.loadingMap.set(el, loadingVNode.component.proxy);
			}
		}
	} else {
		for (const [key, value] of state.loadingMap.entries()) {
			if (key === el) {
				// 关闭 loading
				value.state.isShow = false;
			}
		}
	}
}

export default LoadingConstructor;
export { LoadingDirective, close, useLoading };
