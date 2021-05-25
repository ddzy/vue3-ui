<template>
	<transition name="v3-message-slide-fade" appear mode="out-in">
		<div
			v-if="state.isShow"
			:style="{
				top: `${props.offset}px`,
				zIndex: VARIABLE.getNextZIndex(),
			}"
			:class="[
				'v3-message',
				`v3-message--${props.type}`,
				`${props.customClass}`,
			]"
		>
			<div class="v3-message__inner">
				<div class="v3-message__icon">
					<i
						:class="{
							'v3-icon': true,
							[state.defaultProps.icon]: true,
						}"
					></i>
				</div>
				<div
					:class="{
						'v3-message__content': true,
						[`is-center`]: props.center,
					}"
				>
					<span
						v-if="props.dangerouslyUseHTMLString"
						v-html="props.message"
					></span>
					<span v-else>{{ message }}</span>
				</div>
				<div class="v3-message__close" v-if="props.showClose" @click="close">
					<i class="v3-icon v3-icon-close"></i>
				</div>
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	onMounted,
	PropType,
	reactive,
	watch,
} from 'vue';

import * as TYPES from '@/public/types/message';
import VARIABLE from '@common/constants/internal-variable';
import { close } from './MessageConstructor';

export default defineComponent({
	name: 'V3Message',
	props: {
		/** 持续时间 */
		duration: {
			type: Number,
			default: 3000,
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
		const state = reactive({
			defaultProps: {
				icon: '',
			},
			/** 控制当前的消息框是否显示 */
			isShow: true,
			timer: 0,
		}) as any;
		const app = getCurrentInstance();

		watch(
			props,
			() => {
				state.defaultProps.icon = props.icon || `v3-icon-${props.type}-fill`;
			},
			{ immediate: true }
		);

		return {
			app,
			state,
			props,
			VARIABLE,
		};
	},
	methods: {
		/**
		 * 关闭当前消息框（可在外部调用 `instance.close()`
		 */
		async close() {
			close(this);
		},
	},
	mounted() {
		if (this.props.duration) {
			this.state.timer = setTimeout(this.close, this.props.duration);
		}
	},
});
</script>
<style lang="scss" scoped>
@import './Message.scss';
</style>
