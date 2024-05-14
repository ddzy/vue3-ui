<template>
	<transition :name="props.animation ? 'v3-tag-shrink' : ''">
		<div
			v-if="state.isShow"
			:style="{
				backgroundColor: props.backgroundColor,
				color: props.color,
				borderColor: props.borderColor,
			}"
			:class="{
				'v3-tag': true,
				'is-plain': props.plain,
				'is-closeable': props.closeable,
				'is-animation': props.animation,
				[`v3-tag--${props.type}`]: true,
				[`is-size--${props.size}`]: props.size,
			}"
		>
			<slot></slot>
			<V3Icon v-if="props.closeable" type="CloseSmall" @click="handleClose" />
		</div>
	</transition>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import * as TYPES from '@typings/index';
import V3Icon from '@components/icon/main';

interface IState {
	isShow: boolean;
}

export default defineComponent({
	name: 'V3Tag',
	props: {
		/** 标签的类型（与 V3Button 大体相同） */
		type: {
			type: String as PropType<TYPES.ITagType>,
			default: 'primary',
			validator(v: string) {
				return ['primary', 'success', 'danger', 'warning', 'info'].includes(v);
			},
		},
		/** 是否可关闭标签 */
		closeable: {
			type: Boolean,
			default: false,
		},
		/** 是否为朴素标签（与 V3Button 相同） */
		plain: {
			type: Boolean,
			default: true,
		},
		/** 标签尺寸 */
		size: {
			type: String as PropType<TYPES.ITagSize>,
			default: 'medium',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
		/** 自定义标签的背景色 */
		backgroundColor: {
			type: String,
			default: '',
		},
		/** 自定义标签的文字颜色 */
		color: {
			type: String,
			default: '',
		},
		/** 自定义标签的边框颜色 */
		borderColor: {
			type: String,
			default: '',
		},
		/** 是否开启动画 */
		animation: {
			type: Boolean,
			default: true,
		},
	},
	setup(props: TYPES.ITagProps, context) {
		const state: IState = reactive({
			/** 是否显示当前标签 */
			isShow: true,
		});

		function handleClose() {
			state.isShow = false;

			context.emit('close');
		}

		return {
			props,
			state,
			handleClose,
		};
	},
});
</script>
<style lang="scss">
@import './Tag.scss';
</style>
