import {
	MaybeRefOrGetter,
	getCurrentScope,
	onScopeDispose,
	toValue,
	watch,
} from 'vue';

import { noop } from '.';
import useSupport from './useSupport';

type IUseResizeObserver = (
	/** 需要监听的 DOM 元素 */
	target: MaybeRefOrGetter<Element | Element[] | undefined>,
	callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void,
	options?: IUseResizeObserverOptions,
) => IUseResizeObserverReturn;
interface IUseResizeObserverOptions extends ResizeObserverOptions {}
type IUseResizeObserverReturn = {
	/** 取消所有监听 */
	stop: () => void;
};

/**
 * 监听元素的大小变化
 * @param target 监听的 DOM 元素
 * @param callback 监听时的触发回调
 * @param options
 * @returns
 */
const useResizeObserver: IUseResizeObserver = (
	target,
	callback,
	options = {},
) => {
	const defaultOptions: IUseResizeObserverOptions = {
		...options,
	};
	const isSupport = useSupport(() => !!globalThis.ResizeObserver);
	if (!isSupport.value) {
		return {
			stop: noop,
		};
	}

	const observer = new ResizeObserver(callback);

	watch(
		() => toValue(target),
		(target) => {
			if (target) {
				target = Array.isArray(target) ? target : [target];
				target.forEach((t) => {
					observer.observe(t, defaultOptions);
				});
			}
		},
		{ immediate: true },
	);

	function stop() {
		observer && observer.disconnect();
	}

	if (getCurrentScope()) {
		onScopeDispose(() => {
			stop();
		});
	}

	return {
		stop,
	};
};

export default useResizeObserver;
