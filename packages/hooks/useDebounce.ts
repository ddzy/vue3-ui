import { ref } from 'vue';

type IUseDebounce = (
	/** 触发时的回调 */
	callback: (args: any[]) => void,
	/** 触发频率 */
	timestamp?: number,
) => IUseDebounceReturn;
type IUseDebounceReturn = (args: any[]) => void;

/**
 * 防抖
 */
const useDebounce: IUseDebounce = function (callback, timestamp = 200) {
	let timer: any = ref(0);

	return function (...args) {
		if (timer.value) {
			clearTimeout(timer.value);
		}
		timer.value = setTimeout(function () {
			// @ts-ignore
			callback.apply(this, args);
		}, timestamp);
	};
};

export default useDebounce;
