import { MaybeRefOrGetter, Ref, computed, ref } from 'vue';
import useElementBounding from './useElementBounding';
import usePosition from './usePosition';

type IUseMouseInElement = (
	el: MaybeRefOrGetter<HTMLElement | undefined>,
	options?: IUseMouseInElementOptions,
) => IUseMouseInElementReturn;
type IUseMouseInElementOptions = {};
type IUseMouseInElementReturn = {
	/** 鼠标距离元素左侧的距离 */
	elementX: Ref<number>;
	/** 鼠标距离元素顶部的距离 */
	elementY: Ref<number>;
	/** 鼠标是否在元素内部 */
	isInside: Ref<boolean>;
};

/**
 * 获取鼠标相对于 DOM 元素的位置
 * @param el 需要获取鼠标相对位置的 DOM 容器
 * @param options
 * @returns
 */
const useMouseInElement: IUseMouseInElement = (el, options = {}) => {
	const elementX = ref(0);
	const elementY = ref(0);
	const { left, top, width, height, update } = useElementBounding(el);
	const { clientX, clientY } = usePosition({
		callback() {
			update();
			elementX.value = clientX.value - left.value;
			elementY.value = clientY.value - top.value;
		},
	});
	const isInside = computed(() => {
		return (
			elementX.value >= 0 &&
			elementX.value <= width.value &&
			elementY.value >= 0 &&
			elementY.value <= height.value
		);
	});

	return {
		elementX,
		elementY,
		isInside,
	};
};

export default useMouseInElement;
