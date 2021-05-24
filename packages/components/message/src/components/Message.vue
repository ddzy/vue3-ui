<template>
	<transition name="slide-fade" appear mode="out-in">
		<div>message：{{ app.uid }}</div>
	</transition>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, reactive } from 'vue';

import * as TYPES from '@/public/types/message';

export default defineComponent({
	name: 'V3Message',
	props: {
		/** 持续时间 */
		duration: {
			type: Number,
			default: 1,
		},
		/** 消息框的类型 */
		type: {
			type: String as PropType<TYPES.IMessageType>,
			default: 'info',
			validator: (v: string) => {
				return ['success', 'warning', 'info', 'danger'].includes(v);
			},
		},
		/** 消息内容 */
		message: {
			type: [String, Object] as PropType<TYPES.IMessageMessage>,
			default: '',
		},
		/** 自定义图标 */
		icon: {
			type: String,
			default: '',
		},
		/** 是否把 message 作为 HTML 渲染 */
		dangerouslyUseHTMLString: {
			type: Boolean,
			default: false,
		},
		/** 自定义消息框的类名 */
		customClass: {
			type: String,
			default: '',
		},
		/** 是否显示关闭按钮 */
		showClose: {
			type: Boolean,
			default: true,
		},
		/** 弹窗框内的文本是否居中 */
		center: {
			type: Boolean,
			default: false,
		},
		/** 弹窗框距离窗口顶部的距离 */
		offset: {
			type: Number,
			default: 20,
		},
		/** 关闭时触发的事件 */
		onClose: {
			type: Function as PropType<TYPES.IMessageOnClose>,
			default() {
				return () => {};
			},
		},
	},
	setup(props: TYPES.IMessageProps) {
		const state = reactive({});
		const app = getCurrentInstance();

		return {
			app,
			state,
			props,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Message.scss';
</style>
