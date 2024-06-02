import { onMounted, onUnmounted } from 'vue';
import useThrottle from './useThrottle';

type IUseResize = (options?: IUseResizeOptions) => IUseResizeReturn;
interface IUseResizeOptions {
	/** 触发频率 */
	throttleTime?: number;
	/** 触发时的回调 */
	callback?: (e: MouseEvent) => void;
}
interface IUseResizeReturn {}

/**
 * 监听浏览器窗口变化
 */
const useResize: IUseResize = (options = {}) => {
	const defaultOptions = {
		throttleTime: 0,
		callback: () => {},
		...options,
	};

	function handleResize(e: MouseEvent) {
		defaultOptions.callback(e);
	}
	const resizeHelper = useThrottle(handleResize, defaultOptions.throttleTime);

	onMounted(() => {
		window.addEventListener('resize', resizeHelper, false);
	});
	onUnmounted(() => {
		window.removeEventListener('resize', resizeHelper);
	});

	return {};
};

export default useResize;
