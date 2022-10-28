import * as TYPES from '@felibrary/vue3-ui';

/**
 * 节流 hook
 * @param callback 回调
 * @param timestamp 每隔多少秒执行一次回调
 * @returns
 */

const useThrottle: TYPES.IUseThrottle = function useThrottle(
	callback,
	timestamp = 200
) {
	let prevTime = Date.now();

	return function(...args) {
		const currentTime = Date.now();

		if (currentTime - prevTime >= timestamp) {
			callback.apply(this, args);
			prevTime = currentTime;
		}
	};
};

export default useThrottle;
