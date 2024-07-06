import {
	MaybeRefOrGetter,
	UnwrapRef,
	getCurrentScope,
	onScopeDispose,
	reactive,
	toValue,
	watch,
} from 'vue';

import { Arrayable } from './hooks';

interface ICustomTarget {
	addEventListener(event: string, callback: any, options?: any): void;
	removeEventListener(event: string, callback: any, options?: any): void;
}
interface ICustomEventMap {
	[key: string]: any;
}

type IUseEventListenerTarget = MaybeRefOrGetter<
	Window | Document | HTMLElement | ICustomTarget
>;
type IUseEventListenerEventMap<TARGET> =
	UnwrapRef<TARGET> extends Window | (() => Window)
		? WindowEventMap
		: UnwrapRef<TARGET> extends Document | (() => Document)
			? DocumentEventMap
			: UnwrapRef<TARGET> extends HTMLElement | (() => HTMLElement)
				? HTMLElementEventMap
				: ICustomEventMap;
type IUseEventListenerEvent<TARGET> = keyof IUseEventListenerEventMap<TARGET>;

// 回调中传递的事件对象
type IUseEventListenerEventPass<
	TARGET extends IUseEventListenerTarget,
	EVENT_MAP extends IUseEventListenerEventMap<TARGET>,
	EVENT extends Arrayable<IUseEventListenerEvent<TARGET>>,
	// @ts-ignore
> = EVENT extends Array<any> ? EVENT_MAP[EVENT[0]] : EVENT_MAP[EVENT];

type IUseEventListenerCallback<EVENT_PASS> = (e: EVENT_PASS) => void;
interface IUseEventListenerOptions extends AddEventListenerOptions {}
type IUseEventListenerReturn = () => void;

/**
 * useEventListener 统一事件监听器
 * @param target 添加监听器的目标元素
 * @param event 事件名，可以是数组
 * @param callback 事件回调，如果 event 是数组，则为 event 中的每一项都监听事件
 * @param options 其他配置项
 * @returns
 */
export default function useEventListener<
	TARGET extends IUseEventListenerTarget,
	EVENT extends Arrayable<IUseEventListenerEvent<TARGET>>,
	CALLBACK = IUseEventListenerCallback<
		IUseEventListenerEventPass<TARGET, IUseEventListenerEventMap<TARGET>, EVENT>
	>,
>(
	target: TARGET,
	event: EVENT,
	callback: CALLBACK,
	options?: IUseEventListenerOptions,
): IUseEventListenerReturn {
	const defaultOptions: typeof options = {
		...options,
	};

	const events: string[] = reactive([]);
	if (!Array.isArray(event)) {
		events.push(event.toString());
	} else {
		events.push(...event);
	}

	const cleanups: Function[] = reactive([]);
	const register = (t: any, e: any, c: any, o: any) => {
		t.addEventListener(e, c, o);
		return () => {
			t.removeEventListener(e, c);
		};
	};
	watch(
		() => toValue(target),
		(t) => {
			if (t) {
				// 监听的对象发生变化，注销掉先前注册的所有监听器
				stop();
				events.forEach((e) => {
					cleanups.push(register(t, e, callback, defaultOptions));
				});
			}
		},
		{ immediate: true },
	);

	function stop() {
		cleanups.forEach((v) => v());
		cleanups.length = 0;
	}

	if (getCurrentScope()) {
		onScopeDispose(() => {
			stop();
		});
	}

	return stop;
}
