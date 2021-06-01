// @ts-nocheck

import * as TYPES from '@/public/types/message';
import {
	ComponentInternalInstance,
	ComponentPublicInstance,
	createVNode,
	reactive,
	render,
} from 'vue';
import Message from './Message.vue';

interface IState {
	messageList: ComponentPublicInstance<any, any>[];
	instanceWrapper: HTMLElement;
}

const state: IState = reactive({
	/** 消息列表 */
	messageList: [],
	/** 挂载消息框的容器 */
	instanceWrapper: document.createElement('div'),
});

const MessageConstructor: TYPES.IMessageConstructor = function(
	options: TYPES.IMessageProps
) {
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
			closeOnHover: false,
			onClose() {
				return true;
			},
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

	// 利用 VNode 的形式来挂载消息框，避免多余的 DOM 元素
	// const instanceWrapper = document.createElement('div');
	state.instanceWrapper = document.createElement('div');
	const instanceVNode = createVNode(Message, {
		...defaultOptions,
	});

	render(instanceVNode, state.instanceWrapper);
	document.body.appendChild(
		state.instanceWrapper.firstElementChild as HTMLElement
	);

	const instance = (instanceVNode.component as ComponentInternalInstance)
		.proxy as ComponentPublicInstance;

	state.messageList.push(instance);

	return instance;
};

(['success', 'danger', 'info', 'warning'] as TYPES.IMessageType[]).forEach(
	type => {
		MessageConstructor[type] = function(options) {
			const baseOptions = Object.assign(options, {
				type,
			});

			return MessageConstructor(baseOptions);
		};
	}
);

export default MessageConstructor;
export function close(instance: ComponentPublicInstance) {
	state.messageList.forEach((message, index) => {
		if (instance === message) {
			// 关闭消息框并从消息队列中移除
			message.state.isShow = false;
			state.messageList.splice(index, 1);
		}
	});
}
