type IUseThrottle = (
	callback: (...args: any[]) => void,
	timestamp?: number,
) => (...args: any[]) => void;

/**
 * 节流 hook
 * @param callback 回调
 * @param timestamp 每隔多少秒执行一次回调
 * @returns
 */
const useThrottle: IUseThrottle = function useThrottle(
	callback,
	timestamp = 200,
) {
	let prevTime = Date.now();

	return function (this: any, ...args) {
		const currentTime = Date.now();

		if (currentTime - prevTime >= timestamp) {
			callback.apply(this, args);
			prevTime = currentTime;
		}
	};
};

export default useThrottle;
