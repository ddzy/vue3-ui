type IUseThrottle = (
	/** 触发时的回调 */
	callback: (...args: any[]) => void,
	/** 触发频率 */
	timestamp?: number,
) => IUseThrottleReturn;
type IUseThrottleReturn = (...args: any[]) => void;

/**
 * 节流
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
