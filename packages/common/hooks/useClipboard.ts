import {
	ComputedRef,
	MaybeRefOrGetter,
	computed,
	nextTick,
	ref,
	toValue,
	watch,
	type Ref,
} from 'vue';
import usePermission from './usePermission';
import useSupport from './useSupport';

type IUseClipboard = (options?: IUseClipboardOptions) => IUserClipboardReturn;
interface IUseClipboardOptions {
	/** 是否使用较老的 document.execCommand API，默认使用最新的 Clipboard API */
	legacy?: boolean;
}
type IUserClipboardReturn = {
	/** 浏览器是否支持复制 */
	isSupport: ComputedRef<boolean>;
	/** 是否成功复制 */
	isCopied: Ref<boolean>;
	/** 复制的值 */
	text: Ref<string>;
	copy: (text: IUserClipboardData) => void;
};
type IUserClipboardData = MaybeRefOrGetter<string>;

/**
 * 剪贴板操作
 * @description 默认使用最新的 Clipboard API，如果浏览器不支持，则回退至使用 document.execCommand
 * @description document.execCommand 只允许在非用户手动的情况下写入剪贴板，但是不允许非用户手动操作读取剪贴板（使用 window.getSelection 代替）；Clipboard API 则可以利用 writeText 异步写入剪贴板，readText 异步读取剪贴板
 * @description Clipboard API 在读取/写入剪贴板时，浏览器会弹窗请求权限
 */
const useClipboard: IUseClipboard = (options = {}) => {
	const defaultOptions: IUseClipboardOptions = {
		legacy: false,
		...options,
	};
	const text = ref<string>('');
	const isCopied = ref(false);
	const isSupportClipboardAPI = useSupport(() => !!navigator.clipboard);
	const isSupportExecCommand = useSupport(
		() => document.execCommand && typeof document.execCommand === 'function',
	);
	const isSupport = computed(
		() => !!(isSupportClipboardAPI.value || isSupportExecCommand.value),
	);
	const hasReadPermission = usePermission('clipboard-read');
	const hasWritePermission = usePermission('clipboard-write');

	watch(
		isSupport,
		() => {
			if (isSupport.value) {
				// 监听剪贴板的 copy / cut 事件，更新文本
				function _handler(e: ClipboardEvent) {
					if (isSupportExecCommand.value && defaultOptions.legacy) {
						legacyRead();
					} else if (isSupportClipboardAPI.value && hasReadPermission.value) {
						read();
					} else if (isSupportExecCommand.value) {
						legacyRead();
					}
				}
				document.addEventListener('copy', _handler);
				document.addEventListener('cut', _handler);
			}
		},
		{ immediate: true },
	);

	async function copy(_text: IUserClipboardData) {
		_text = toValue(_text);
		isCopied.value = false;
		await nextTick();

		if (isSupport) {
			if (isSupportExecCommand.value && defaultOptions.legacy) {
				await legacyWrite(_text);
			} else if (isSupportClipboardAPI.value && hasWritePermission.value) {
				await write(_text);
			} else if (isSupportExecCommand) {
				await legacyWrite(_text);
			}
			text.value = _text;
			isCopied.value = true;
		}
	}

	async function read() {
		// 使用 Clipboard API 读取剪贴板
		try {
			text.value = await window.navigator.clipboard.readText();
		} catch (error) {
			text.value = '';
		}
	}

	async function legacyRead() {
		// execCommand 不允许读取剪贴板，只能通过获取页面上当前选中的元素的文本来代替
		text.value = window.getSelection?.()?.toString() ?? '';
	}

	async function write(_text: string) {
		return new Promise(async (resolve, reject) => {
			try {
				await navigator.clipboard.writeText(_text);
				resolve(undefined);
			} catch (error) {
				reject();
			}
		});
	}

	async function legacyWrite(_text: string) {
		return new Promise((resolve, reject) => {
			// 必须把 textarea 插入到页面上，才可以复制
			const textarea = document.createElement('textarea');
			textarea.style.cssText += `position: fixed; left: -9999px; top: -9999px`;
			textarea.value = _text;
			document.body.appendChild(textarea);
			textarea.select();
			let copied = document.execCommand('copy');
			document.body.removeChild(textarea);
			if (copied) {
				resolve(undefined);
			} else {
				reject();
			}
		});
	}

	return {
		isSupport,
		isCopied,
		text,
		copy,
	};
};

export default useClipboard;
