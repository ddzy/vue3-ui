// @ts-nocheck

import { isStrictObject } from '@common/utils';
import * as TYPES from '@typings/index';
import {
	ComponentInternalInstance,
	FunctionDirective,
	h,
	reactive,
	render,
} from 'vue';
import Loading from './Loading.vue';

interface IState {
	loadingMap: Map<HTMLElement, ComponentInternalInstance>;
	loadingInstance: ComponentInternalInstance | null;
	instanceWrapper: HTMLElement;
}

const state: IState = reactive({
	/** loading 挂载元素 -> loading 实例映射表 */
	loadingMap: new Map(),
	/** 全屏状态下的 loading 单例 */
	loadingInstance: null,
	instanceWrapper: document.createElement('div'),
});

/**
 * 使用方式：实例调用（this.$loading）
 * @param options 配置项
 * @returns
 */
const LoadingConstructor: TYPES.ILoadingConstructor = (
	options: TYPES.ILoadingProps,
) => {
	const defaultOptions: Required<TYPES.ILoadingProps> = {
		content: 'Loading...',
		...options,
		fullscreen: true, // 通过实例调用时，强制全屏
	};

	state.instanceWrapper = document.createElement('div');
	const instanceVNode = h(Loading, {
		...defaultOptions,
	});

	// 将 Loading 渲染到 body 上
	render(instanceVNode, state.instanceWrapper);
	document.body.appendChild(state.instanceWrapper.firstElementChild);

	// 将当前 loading 实例追加到列表中
	state.loadingInstance = instanceVNode.component as ComponentInternalInstance;

	return Object.assign(state.loadingInstance, {
		close,
	});
};

/**
 * 使用方式：自定义指令（v-loading）
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
 * 使用方式：Composition API（useLoading）
 * @param options loading 可配置项
 * @returns loading 实例
 */
const useLoading: TYPES.V3LoadingHook = (options) => {
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
	state.loadingInstance.exposed.close();
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
	options: TYPES.ILoadingProps,
) {
	if (isLoading) {
		el.classList.add('v3-loading-parent--relative');
		// 如果当前 DOM 元素已经创建过 loading，那么直接显示 loading，避免重复创建
		if (state.loadingMap.has(el)) {
			state.loadingMap.get(el).exposed.open();
		} else {
			const loadingVNode = h(Loading, {
				...options,
				style: { position: 'absolute', inset: 0 },
				fullscreen: false,
				fixed: false,
			});
			render(loadingVNode, el);
			// 将当前实例追加到映射表
			if (loadingVNode.component) {
				state.loadingMap.set(el, loadingVNode.component);
			}
		}
	} else {
		for (const [key, value] of state.loadingMap.entries()) {
			if (key === el) {
				// 关闭 loading
				value.exposed.close();
			}
		}
	}
}

export default LoadingConstructor;
export { LoadingDirective, close, useLoading };
