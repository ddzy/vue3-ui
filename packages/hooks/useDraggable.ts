import { MaybeRefOrGetter, ref, toValue, watch } from 'vue';

import useEventListener from './useEventListener';
import usePosition from './usePosition';

type IUseDraggable = (
	/** 拖拽的 DOM 元素 */
	source: MaybeRefOrGetter<HTMLElement | undefined>,
	/** 拖拽的区域 DOM 元素 */
	target?: MaybeRefOrGetter<HTMLElement | undefined>,
	options?: IUseDraggableOptions,
) => IUseDraggableReturn;
type IUseDraggableOptions = {};
type IUseDraggableReturn = {};

/**
 * 使得元素可拖拽
 * @param source 需要拖拽的元素
 * @param target 拖拽的容器（限制在该元素内部拖动）
 * @param options
 * @returns
 */
const useDraggable: IUseDraggable = (
	source,
	target = document.body,
	options = {},
) => {
	const defaultOptions: IUseDraggableOptions = {
		...options,
	};
	const isDragging = ref(false);
	const prevClientX = ref(0);
	const prevClientY = ref(0);
	const translateX = ref(0);
	const translateY = ref(0);
	const { clientX, clientY } = usePosition({
		callback() {
			if (isDragging.value) {
				const _source = toValue(source);
				if (_source) {
					// 根据鼠标相邻两次移动之间的差值，与元素已经移动的距离累加，得出最终移动的距离
					translateX.value += clientX.value - prevClientX.value;
					translateY.value += clientY.value - prevClientY.value;
					_source.style.translate = `${translateX.value}px ${translateY.value}px 0`;
					prevClientX.value = clientX.value;
					prevClientY.value = clientY.value;
				}
			}
		},
	});

	watch(
		[() => toValue(source), () => toValue(target)],
		([source, target]) => {
			if (!source || !target) {
				return;
			}
			useEventListener(source, 'dragstart', (e) => {
				// 阻止默认的拖拽行为
				e.preventDefault();
			});
			useEventListener(source, 'mousedown', (e) => {
				prevClientX.value = e.clientX;
				prevClientY.value = e.clientY;
				isDragging.value = true;
			});
			useEventListener(document, 'mouseup', (e) => {
				isDragging.value = false;
			});
		},
		{ immediate: true },
	);

	return {};
};

export default useDraggable;
