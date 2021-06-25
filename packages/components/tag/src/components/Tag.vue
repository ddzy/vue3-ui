<template>
	<transition :name="props.animation ? 'v3-tag-shrink' : ''">
		<div
			v-if="state.isShow"
			:class="[
				'v3-tag',
				props.type ? `v3-tag--${props.type}` : '',
				props.plain ? 'is-plain' : '',
				props.closeable ? 'is-closeable' : '',
				props.size ? `is-size--${props.size}` : '',
				props.animation ? 'is-animation' : '',
			]"
			:style="{
				backgroundColor: props.backgroundColor,
				color: props.color,
				borderColor: props.borderColor,
			}"
		>
			<slot></slot>
			<i
				class="v3-icon v3-icon-close"
				v-if="props.closeable"
				@click="handleClose"
			></i>
		</div>
	</transition>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import * as TYPES from '@/public/types/tag';

interface IState {
	isShow: boolean;
}

export default defineComponent({
	name: 'V3Tag',
	props: {
		/** 标签的类型（与 V3Button 大体相同） */
		type: {
			type: String as PropType<TYPES.ITagType>,
			default: '',
			validator(v: any) {
				return ['', 'primary', 'success', 'danger', 'warning', 'info'].includes(
					v
				);
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
			validator(v: any) {
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
<style lang="scss" scoped>
@import './Tag.scss';
</style>
