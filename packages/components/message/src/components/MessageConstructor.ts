import {
	ComponentPublicInstance,
	createApp,
	reactive,
	toRef,
	watch,
} from 'vue';
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
			},
			options
		);
		const instance = createApp(Message, {
			...defaultOptions,
		});

		// 装载消息框的容器
		const div = document.createElement('div');
		div.setAttribute('id', `message--${instance._uid}`);
		document.body.appendChild(div);

		const mountedInstance = instance.mount(div);
		state.messageList = state.messageList.concat(mountedInstance);

		// 到时间后自动移除该消息框
		if (defaultOptions.duration) {
			setTimeout(() => {
				document.body.removeChild(div);
				state.messageList = state.messageList.filter(v => {
					return v !== mountedInstance;
				});
			}, defaultOptions.duration);
		}

		// 返回当前消息框的实例
		return mountedInstance;
	}
);
