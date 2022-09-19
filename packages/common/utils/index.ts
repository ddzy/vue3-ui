export function handleTransitionEnter(el: HTMLElement): void {
	el.style.height = 'auto';
	const offsetHeight = el.offsetHeight;
	el.style.height = '0px';
	el.offsetHeight;
	el.style.height = `${offsetHeight}px`;
}
export function handleTransitionLeave(el: HTMLElement): void {
	el.style.height = '0px';
}

/**
 * 判断是否为键值对的对象
 * @param v 任意值
 * @returns boolean
 */
export function isStrictObject(v: any) {
	return {}.toString.call(v) === '[object Object]';
}
/**
 * 判断是否为 NaN
 * @param v 任意值
 * @returns boolean
 */
export function isNaN(v: any) {
	return typeof v === 'number' && v !== v;
}
/**
 * 判断是否为数字（可能为 NaN）
 * @param v 任意值
 * @returns boolean
 */
export function isNumber(v: any) {
	return typeof v === 'number';
}
/**
 * 判断是否为严格的数字（不包括 NaN）
 * @param v 任意值
 * @returns boolean
 */
export function isStrictNumber(v: any) {
	return typeof v === 'number' && !isNaN(v);
}
export function isStrictArray(v: any) {
	return Array.isArray(v);
}
export function isString(v: any) {
	return typeof v === 'string';
}
export function isFunction(v: any) {
	return typeof v === 'function';
}

/**
 * 将 16 进制颜色值转换为 rgba 格式
 * @param hex 16 进制颜色值
 * @param opacity 透明度
 * @returns
 */
export function hexToRgba(hex: string, opacity: number) {
	return `rgba(${parseInt('0x' + hex.slice(1, 3))}, ${parseInt(
		'0x' + hex.slice(3, 5)
	)}, ${parseInt('0x' + hex.slice(5, 7))}, ${opacity})`;
}

/**
 * 计算元素距离文档顶部的距离
 * @param el 任意 DOM 元素
 * @returns
 */
export function getDomOffsetToDocument(el: HTMLElement) {
	let pos = {
		left: 0,
		top: 0,
	};
	let parentEl: any = el;

	while (parentEl) {
		pos.left += parentEl.offsetLeft;
		pos.top += parentEl.offsetTop;

		parentEl = parentEl.offsetParent;
	}

	return pos;
}

export function throttle(
	callback: Function,
	options: {
		timestamp?: number;
	}
) {
	const defaultOptions: Required<typeof options> = {
		timestamp: 100,
		...options,
	};
	let prevTime = 0;

	return function(...args: any[]) {
		const now = Date.now();

		if (now - prevTime >= defaultOptions.timestamp) {
			// @ts-ignore
			callback.apply(this, args);
			prevTime = now;
		}
	};
}

/**
 * 时间固定的缓动动画
 * @param currentM 当前的位置
 * @param targetM 最终位置
 * @param v 缓动速率
 * @param doing 回调
 */
export function ease(
	currentM: number,
	targetM: number,
	v: number = 8,
	doing = (isEnd: boolean, nextM: number) => {}
) {
	let nextM = currentM + (targetM - currentM) / v;
	if (nextM >= targetM || nextM <= 0) {
		doing(true, nextM);
	} else {
		doing(false, nextM);
	}
}
