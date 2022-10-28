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
			<span v-if="!props.dot">{{ state.value }}</span>
		</sup>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, toRef, watch } from 'vue';
import * as TYPES from '@felibrary/vue3-ui';

interface IState {
	value: TYPES.IBadgeValue;
}

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
		/** 自定义徽标的背景颜色（优先级比 type 高） */
		backgroundColor: {
			type: String,
			default: '',
		},
		/** 自定义徽标的文本颜色（优先级比 type 高） */
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
		const state: IState = reactive({
			value: '',
		});

		watch(
			toRef(props, 'value'),
			() => {
				if (typeof props.value === 'number' && props.max > 0) {
					// 如果超出最大值则显示最大值，反之显示当前值
					state.value =
						props.value >= props.max ? `${props.max}+` : props.value;
				} else {
					state.value = props.value;
				}
			},
			{ immediate: true }
		);

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss">
@import './Badge.scss';
</style>
