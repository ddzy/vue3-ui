/**
 * 节流 hook
 * @param callback 回调
 * @param timestamp 每隔多少秒执行一次回调
 * @returns
 */
export default function useThrottle(
	callback: (...args: any[]) => void,
	timestamp: number = 200
) {
	let prevTime = Date.now();

	return function(this: ThisType<any>, ...args: any[]) {
		const currentTime = Date.now();

		if (currentTime - prevTime >= timestamp) {
			callback.apply(this, args);
			prevTime = currentTime;
		}
	};
}
