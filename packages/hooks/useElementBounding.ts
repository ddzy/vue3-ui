import { MaybeRefOrGetter, type Ref, ref, toValue, watch } from 'vue';

import useEventListener from './useEventListener';
import useThrottle from './useThrottle';

type IUseElementBounding = (
	/** DOM 元素 */
	el: MaybeRefOrGetter<HTMLElement | undefined>,
	options?: IUseElementBoundingOptions,
) => IUseElementBoundingReturn;
interface IUseElementBoundingOptions {
	/** 是否监听窗口缩放 */
	windowResize?: boolean;
	/** 是否监听页面滚动 */
	windowScroll?: boolean;
	/** resize/scroll 触发频率 */
	throttleTime?: number;
}
type IUseElementBoundingReturn = {
	x: Ref<number>;
	y: Ref<number>;
	width: Ref<number>;
	height: Ref<number>;
	left: Ref<number>;
	top: Ref<number>;
	right: Ref<number>;
	bottom: Ref<number>;
	update: () => void;
};

/**
 * 获取 DOM 元素的 getBoundingClientRect
 */
const useElementBounding: IUseElementBounding = (el, options = {}) => {
	const defaultOptions: IUseElementBoundingOptions = {
		...options,
		windowResize: true,
		windowScroll: true,
		throttleTime: 0,
	};
	const width = ref(0);
	const height = ref(0);
	const x = ref(0);
	const y = ref(0);
	const left = ref(0);
	const top = ref(0);
	const right = ref(0);
	const bottom = ref(0);

	watch(
		() => toValue(el),
		(el) => {
			if (el) {
				update();
			}
		},
		{ immediate: true },
	);

	function update() {
		const target = toValue(el);
		if (target) {
			const bounding = target.getBoundingClientRect();
			width.value = bounding.width;
			height.value = bounding.height;
			x.value = bounding.x;
			y.value = bounding.y;
			left.value = bounding.left;
			top.value = bounding.top;
			right.value = bounding.right;
			bottom.value = bounding.bottom;
		}
	}
	const _updateHelper = useThrottle(update, defaultOptions.throttleTime);
	if (defaultOptions.windowResize) {
		useEventListener(window, 'resize', _updateHelper);
	}
	if (defaultOptions.windowScroll) {
		useEventListener(window, 'scroll', _updateHelper);
	}

	return {
		width,
		height,
		x,
		y,
		left,
		top,
		right,
		bottom,
		update,
	};
};
export default useElementBounding;
