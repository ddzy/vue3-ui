<template>
	<div
		:class="{
			'v3-badge': true,
			'is-dot': props.dot,
			[`v3-badge--${props.type}`]: true,
		}"
	>
		<slot></slot>
		<sup
			class="v3-badge__content"
			:style="{
				backgroundColor: props.backgroundColor,
				color: props.color,
			}"
		>
			<span v-if="!props.dot">{{ props.value }}</span>
		</sup>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import * as TYPES from '@/public/types/badge';

interface IState {}

export default defineComponent({
	name: 'V3Badge',
	props: {
		/** 徽标的值 */
		value: {
			type: [String, Number] as PropType<TYPES.IBadgeValue>,
			default: '',
		},
		/** 徽标的类型（五种内置类型） */
		type: {
			type: String as PropType<TYPES.IBadgeType>,
			default: 'primary',
			validator(v: string) {
				return ['primary', 'success', 'danger', 'warning', 'info'].includes(v);
			},
		},
		/** 自定义徽标的背景颜色（优先级比 type 高），必须和 color 一起设置 */
		backgroundColor: {
			type: String,
			default: '',
		},
		/** 自定义徽标的文本颜色（优先级比 type 高），必须和 backgroundColor 一起设置 */
		color: {
			type: String,
			default: '',
		},
		/** 超出该值时显示 xx+（比如：99+） */
		max: {
			type: Number,
			default: 0,
		},
		/** 是否显示为小圆点（此时设置 value 无效） */
		dot: {
			type: Boolean,
			default: false,
		},
	},
	setup(props: TYPES.IBadgeProps, context) {
		const state: IState = reactive({});

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Badge.scss';
</style>
