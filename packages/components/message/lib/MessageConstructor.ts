// @ts-nocheck

import * as TYPES from '@typings/index';
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
			onClose(done) {
				done();
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

const useMessage: TYPES.V3MessageHook = options => {
	const instance = MessageConstructor(options);

	return {
		instance,
	};
};

function close(instance: ComponentPublicInstance) {
	// 记录当前关闭的消息框的下标
	let interruptIndex = 0;
	// 记录上一个消息框的位置，便于回溯
	let prevOffset = instance.state.defaultProps.offset;

	state.messageList.forEach((message, index) => {
		if (instance === message) {
			// 关闭消息框并从消息队列中移除
			message.state.isShow = false;
			state.messageList.splice(index, 1);
			interruptIndex = index;
		}
	});

	// 更新后续所有消息框的位置（当前位置 = 上一个消息框的位置 = prevOffset）
	for (let index = interruptIndex; index < state.messageList.length; index++) {
		const value = state.messageList[index];
		let currentOffset = value.state.defaultProps.offset;

		value.state.defaultProps.offset = prevOffset;
		prevOffset = currentOffset;
	}
}

export default MessageConstructor;
export { close, useMessage };
