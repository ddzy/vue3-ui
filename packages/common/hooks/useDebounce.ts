import { ref } from 'vue';

/**
 * 防抖 hook
 * @param callback 回调
 * @param timestamp 时间戳
 * @returns
 */
export default function useDebounce(
	callback: (...args: any[]) => void,
	timestamp: number = 200
) {
	let timer: any = ref(null);

	return function(...args: any[]) {
		if (timer.value) {
			clearTimeout(timer.value);
		}
		timer.value = setTimeout(function() {
			// @ts-ignore
			callback.apply(this, args);
		}, timestamp);
	};
}
