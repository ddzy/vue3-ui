import { MaybeRefOrGetter, onUnmounted, ref, toValue, watch } from 'vue';

type IUseIntersectionObserver = (
	/** 需要监听的目标 DOM 元素 */
	target: MaybeRefOrGetter<HTMLElement | HTMLElement[] | null>,
	/** 监听时的回调 */
	callback: (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver,
	) => void,
	options?: IUseIntersectionObserverOptions,
) => IUseIntersectionObserverReturn;
interface IUseIntersectionObserverOptions {
	/** 组件卸载时是否自动清除全部监听 */
	stopAfterUnmount?: boolean;
	root?: Element | Document | null;
	rootMargin?: string;
	threshold?: number | number[];
}
type IUseIntersectionObserverReturn = {
	/** 停止所有监听 */
	stop: () => void;
};

/**
 * 监听 DOM 元素可见性
 */
const useIntersectionObserver: IUseIntersectionObserver = (
	target,
	callback,
	options = {},
) => {
	const defaultOptions: IUseIntersectionObserverOptions = {
		stopAfterUnmount: true,
		...options,
	};
	const io = ref<IntersectionObserver | null>(null);

	watch(
		() => toValue(target),
		(target) => {
			if (target) {
				io.value = new IntersectionObserver(callback, defaultOptions);
				target = Array.isArray(target) ? target : [target];
				target.forEach((v) => {
					io.value && io.value.observe(v);
				});
			}
		},
		{ immediate: true },
	);
	onUnmounted(() => {
		defaultOptions.stopAfterUnmount && stop();
	});

	function stop() {
		io.value && io.value.disconnect();
	}

	return {
		stop,
	};
};

export default useIntersectionObserver;
