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
				props.center ? 'is-center' : '',
				props.showClose ? 'is-closeable' : '',
			]"
			:id="[`v3-message--${app.uid}`]"
			@mouseenter="mouseEnter"
			@mouseleave="mouseLeave"
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
					}"
				>
					<!-- message 为 HTML 字符串 -->
					<span
						v-if="props.dangerouslyUseHTMLString"
						v-html="props.message"
					></span>

					<!-- message 为 VNode -->
					<RenderVNode
						v-else-if="
							!props.dangerouslyUseHTMLString && isVNode(props.message)
						"
						:vnode="props.message"
					/>

					<!-- message 为普通字符串 -->
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
import * as TYPES from '@/public/types/message';
import VARIABLE from '@common/constants/internal-variable';
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	watch,
	h,
	isVNode,
	VNode,
} from 'vue';
import { close } from './MessageConstructor';

export default defineComponent({
	name: 'V3Message',
	components: {
		/** 当 message 为 VNode 类型时，启用此组件渲染 */
		RenderVNode: defineComponent({
			props: {
				vnode: {
					type: Object as PropType<VNode>,
					default: null,
				},
			},
			setup(props) {
				return () => h(props.vnode);
			},
		}),
	},
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
		/** 鼠标移到消息框上时，是否依然要关闭 */
		closeOnHover: {
			type: Boolean,
			default: false,
		},
		/** 关闭时触发的事件，返回 Promise<true> 或者 true 时消息框永远不会关闭 */
		onClose: {
			type: Function as PropType<TYPES.IMessageOnClose>,
			default() {
				return (done: () => void) => {
					done();
				};
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
			isVNode,
		};
	},
	methods: {
		/**
		 * 关闭当前消息框（可在外部调用 `instance.close()`
		 */
		async close() {
			if (typeof this.props.onClose === 'function') {
				this.props.onClose(() => {
					close(this);
				});
			}
		},
		/**
		 * 鼠标停留/移开，根据需要来取消/继续消息框的关闭
		 */
		mouseEnter() {
			if (!this.props.closeOnHover) {
				clearTimeout(this.state.timer);
			}
		},
		mouseLeave() {
			if (!this.props.closeOnHover && this.props.duration) {
				this.state.timer = setTimeout(this.close, this.props.duration);
			}
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
