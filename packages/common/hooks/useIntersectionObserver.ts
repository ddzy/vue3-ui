import { onMounted, onUnmounted, ref } from 'vue';

type IUseIntersectionObserver = (
	target: Element | Element[],
	callback: (
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver,
	) => void,
	options?: IntersectionObserverInit & {
		cleanup?: boolean; // 组件卸载时是否自动清除全部监听
	},
) => {
	stop: () => void;
};

const useIntersectionObserver: IUseIntersectionObserver = (
	target,
	callback,
	options = {
		cleanup: true,
	},
) => {
	const targets = Array.isArray(target) ? target : [target];
	const io = new IntersectionObserver(callback, options);
	const stop = () => {
		io.disconnect();
	};
	targets.forEach((t) => {
		io.observe(t);
	});

	onUnmounted(() => {
		if (options.cleanup) {
			stop();
		}
	});

	return {
		stop,
	};
};

export default useIntersectionObserver;
