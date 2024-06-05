import { MaybeRefOrGetter, ref, toValue, watch } from 'vue';
import useElementBounding from './useElementBounding';
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
	// 开始拖拽时，鼠标到拖拽元素的左边界/上边界的距离
	const startX = ref(0);
	const startY = ref(0);
	const { left, top, update } = useElementBounding(source);
	const { clientX, clientY } = usePosition({
		callback() {
			if (isDragging.value) {
				const _source = toValue(source);
				if (_source) {
					_source.style.left = `${clientX.value - startX.value}px`;
					_source.style.top = `${clientY.value - startY.value}px`;
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
				update();
				startX.value = e.clientX - left.value;
				startY.value = e.clientY - top.value;
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
