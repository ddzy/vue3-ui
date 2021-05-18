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
