import { ref } from 'vue';

type IUseDebounce = (
	callback: (args: any[]) => void,
	timestamp?: number,
) => (args: any[]) => void;

/**
 * 防抖 hook
 * @param callback 回调
 * @param timestamp 时间戳
 * @returns
 */

const useDebounce: IUseDebounce = function (callback, timestamp = 200) {
	let timer: any = ref(null);

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
