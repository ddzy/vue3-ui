import { ComponentPublicInstance, createApp, reactive } from 'vue';
import Message from './Message.vue';
import * as TYPES from '@/public/types/message';

interface IState {
	messageList: ComponentPublicInstance[];
}

const state: IState = reactive({
	/** 消息列表 */
	messageList: [],
});

export default <TYPES.IMessageContructor>(
	function MessageConstructor(options: TYPES.IMessageProps) {
		const defaultOptions = Object.assign(
			{
				duration: 3000,
				type: 'info',
				message: '',
				icon: '',
				dangerouslyUseHTMLString: false,
				customClass: '',
				showClose: false,
				center: false,
				offset: 20,
				onClose: () => {},
			},
			options
		);

		// 计算当前消息框的位置
		// 当前位置 = 上一个消息框的位置 + offset 偏移量
		if (state.messageList.length) {
			const prevInstance = state.messageList[state.messageList.length - 1];
			const prevEl = prevInstance.$el as HTMLElement;
			const prevRectBottom = prevEl.getBoundingClientRect().bottom;

			defaultOptions.offset = prevRectBottom + defaultOptions.offset;
		}

		const messageApp = createApp(Message, {
			...defaultOptions,
		});

		// 装载消息框的容器
		const div = document.createElement('div');
		div.setAttribute('id', `message--${messageApp._uid}`);
		document.body.appendChild(div);

		const instance = messageApp.mount(div);
		state.messageList = state.messageList.concat(instance);

		// 到时间后自动移除该消息框
		if (defaultOptions.duration) {
			setTimeout(() => {
				document.body.removeChild(div);
				state.messageList = state.messageList.filter(v => {
					return v !== instance;
				});
			}, defaultOptions.duration);
		}

		// 返回当前消息框的实例
		return instance;
	}
);
