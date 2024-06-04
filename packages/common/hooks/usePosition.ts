import { ref, type Ref } from 'vue';
import useEventListener from './useEventListener';
import useThrottle from './useThrottle';

type IUsePosition = (options?: IUsePositionOptions) => IUsePositionReturn;
interface IUsePositionOptions {
	/** 触发频率 */
	throttleTime?: number;
	/** 鼠标位置更新时的回调 */
	callback?: Function;
}
type IUsePositionReturn = {
	clientX: Ref<number>;
	clientY: Ref<number>;
	pageX: Ref<number>;
	pageY: Ref<number>;
};

/**
 * 获取鼠标位置
 */
const usePosition: IUsePosition = (options = {}) => {
	const defaultOptions = {
		throttleTime: 0,
		callback: () => {},
		...options,
	};
	const clientX = ref(0);
	const clientY = ref(0);
	const pageX = ref(0);
	const pageY = ref(0);

	function handleMove(e: MouseEvent) {
		clientX.value = e.clientX;
		clientY.value = e.clientY;
		pageX.value = e.pageX;
		pageY.value = e.pageY;
		defaultOptions.callback();
	}
	const moveHelper = useThrottle(handleMove, defaultOptions.throttleTime);
	useEventListener(document, 'mousemove', moveHelper);

	return {
		clientX,
		clientY,
		pageX,
		pageY,
	};
};

export default usePosition;
