import { onMounted, onUnmounted, reactive, ref, type Ref } from 'vue';
import useThrottle from './useThrottle';

type IUsePosition = (options: {
	throttleTime?: number;
	callback?: Function;
}) => {
	clientX: Ref<number>;
	clientY: Ref<number>;
	pageX: Ref<number>;
	pageY: Ref<number>;
};

const usePosition: IUsePosition = function usePosition(options) {
	options = options || {};

	const defaultOptions = reactive({
		throttleTime: 0,
		callback: () => {},
		...options,
	});
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

	onMounted(() => {
		document.addEventListener('mousemove', moveHelper, false);
	});
	onUnmounted(() => {
		document.removeEventListener('mousemove', moveHelper);
	});

	return {
		clientX,
		clientY,
		pageX,
		pageY,
	};
};

export default usePosition;
