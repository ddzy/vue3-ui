import { onMounted, onUnmounted, reactive } from 'vue';
import useThrottle from './useThrottle';

type IUseResize = (options?: {
	throttleTime?: number;
	callback?: (e: MouseEvent) => void;
}) => void;

const useResize: IUseResize = function useResize(options = {}) {
	const defaultOptions = reactive({
		throttleTime: 0,
		callback: () => {},
		...options,
	});

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
