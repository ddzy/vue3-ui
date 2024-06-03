interface ICustomTarget {
	addEventListener(
		event: string,
		callback: IUseEventListenerCallback<any>,
	): void;
	removeEventListener(...args: any[]): void;
}
interface ICustomEventMap {
	[key: string]: any;
}

type IUseEventListenerTarget = Window | Document | HTMLElement | ICustomTarget;
type IUseEventListenerEventMap<TARGET> = TARGET extends Window
	? WindowEventMap
	: TARGET extends Document
	? DocumentEventMap
	: TARGET extends HTMLElement
	? HTMLElementEventMap
	: ICustomEventMap;
type IUseEventListenerEvent<TARGET> = keyof IUseEventListenerEventMap<TARGET>;

// 回调中传递的事件对象
type IUseEventListenerEventPass<
	TARGET extends IUseEventListenerTarget,
	EVENT_MAP extends IUseEventListenerEventMap<TARGET>,
	EVENT extends IUseEventListenerEvent<TARGET>,
> = EVENT_MAP[EVENT];

type IUseEventListenerCallback<EVENT_PASS> = (e: EVENT_PASS) => void;
interface IUseEventListenerOptions {}
type IUseEventListenerReturn = {};

/**
 * useEventListener 统一事件监听器
 * @param target 添加监听器的目标元素
 * @param event 事件名
 * @param callback 事件回调
 * @param options 其他配置项
 * @returns
 */
export default function useEventListener<
	TARGET extends IUseEventListenerTarget,
	EVENT extends IUseEventListenerEvent<TARGET>,
	CALLBACK = IUseEventListenerCallback<
		IUseEventListenerEventPass<TARGET, IUseEventListenerEventMap<TARGET>, EVENT>
	>,
>(
	target: TARGET,
	event: EVENT,
	callback: CALLBACK,
	options?: IUseEventListenerOptions,
): IUseEventListenerReturn {
	return {};
}
