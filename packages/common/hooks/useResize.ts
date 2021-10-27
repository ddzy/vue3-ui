import { onMounted, onUnmounted, reactive, ref } from 'vue';
import useThrottle from './useThrottle';

interface IOptions {
	throttleTime?: number;
	callback?: Function;
}

export default function useResize(options?: IOptions) {
	options = options || {};

	const defaultOptions = reactive({
		throttleTime: 0,
		callback: (e: MouseEvent) => {},
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
}
