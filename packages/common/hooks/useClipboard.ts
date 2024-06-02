import { MaybeRefOrGetter, ref, toValue, type Ref } from 'vue';
import usePermission from './usePermission';
import useSupport from './useSupport';

type IUseClipboard = (options?: IUseClipboardOptions) => IUserClipboardReturn;
interface IUseClipboardOptions {
	/** 是否使用较老的 document.execCommand API，默认使用最新的 Clipboard API */
	legacy?: boolean;
}
type IUserClipboardReturn = {
	/** 浏览器是否支持最新的 Clipboard API */
	isSupport: Ref<boolean>;
	/** 是否成功复制 */
	isCopied: Ref<boolean>;
	/** 复制的值 */
	text: Ref<string>;
	copy: (text: IUserClipboardData) => void;
};
type IUserClipboardData = MaybeRefOrGetter<string>;

/**
 * 剪贴板操作
 */
const useClipboard: IUseClipboard = (options = {}) => {
	const defaultOptions: IUseClipboardOptions = {
		legacy: false,
		...options,
	};
	const text = ref<string>('');
	const isCopied = ref(false);
	const isSupport = useSupport(() => !!navigator.clipboard);
	const hasReadPermission = usePermission('clipboard-read');
	const hasWritePermission = usePermission('clipboard-write');

	async function read() {
		// 使用最新的 Clipboard API 读取剪贴板
		try {
			text.value = await window.navigator.clipboard.readText();
			isCopied.value = true;
		} catch (error) {
			isCopied.value = false;
		}
	}

	async function write(text: IUserClipboardData) {
		text = toValue(text);
		// 如果强制使用较老的 API
		if (defaultOptions.legacy) {
			legacyWrite(text);
		} else if (isSupport.value && hasWritePermission.value) {
			// 默认使用 Clipboard API
			try {
				await window.navigator.clipboard.writeText(text);
				if (hasReadPermission.value) {
					read();
				} else {
					isCopied.value = false;
				}
			} catch (error) {
				isCopied.value = false;
			}
		} else {
			legacyWrite(text);
		}
	}

	async function legacyRead() {
		// 使用兼容性较好的 document.execCommand API 读取剪贴板
		const textarea = document.createElement('textarea');
		textarea.style.cssText += `position: fixed; left: -9999px; top: -9999px`;
		document.body.appendChild(textarea);
		textarea.focus();
		document.execCommand('paste');
		text.value = textarea.value;
		document.body.removeChild(textarea);
	}

	async function legacyWrite(text: string) {
		// 必须把 textarea 插入到页面上，才可以复制
		const textarea = document.createElement('textarea');
		textarea.style.cssText += `position: fixed; left: -9999px; top: -9999px`;
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);
		legacyRead();
	}

	return {
		isSupport,
		isCopied,
		text,
		copy: write,
	};
};

export default useClipboard;
