<template>
	<div
		:class="{
			'v3-switch': true,
			'is-disabled': props.disabled,
			'is-loading': props.loading,
			'is-active': state.isChecked,
		}"
	>
		<input
			ref="checkboxRef"
			type="checkbox"
			class="v3-switch__input"
			v-model="state.isChecked"
			:id="`v3-switch__input--${app.uid}`"
			@change="handleChange"
		/>
		<label
			v-if="props.inactiveLabel || props.inactiveIcon"
			:for="state.isChecked ? `v3-switch__input--${app.uid}` : ''"
			:class="{
				'v3-switch__label': true,
				'v3-switch__inactive': true,
			}"
			>{{ props.inactiveLabel }}</label
		>
		<div class="v3-switch__select">123</div>
		<label
			v-if="props.activeLabel || props.activeIcon"
			:for="state.isChecked ? '' : `v3-switch__input--${app.uid}`"
			:class="{
				'v3-switch__label': true,
				'v3-switch__active': true,
			}"
			>{{ props.activeLabel }}</label
		>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/switch';

export default defineComponent({
	name: 'V3Switch',
	props: {
		/** 绑定值，默认为 true/false */
		modelValue: {
			type: [Boolean, String, Number] as PropType<TYPES.ISwitchModelValue>,
			required: true,
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 是否加载中 */
		loading: {
			type: Boolean,
			default: false,
		},
		/** 开关的宽度（px） */
		width: {
			type: Number,
			default: 60,
		},
		/** 开启状态下的图标（会覆盖 activeLabel） */
		activeIcon: {
			type: String,
			default: '',
		},
		/** 关闭状态下的图标（会覆盖 inactiveLabel） */
		inactiveIcon: {
			type: String,
			default: '',
		},
		/** 开启状态下的值 */
		activeValue: {
			type: [Boolean, String, Number] as PropType<TYPES.ISwitchModelValue>,
			default: true,
		},
		/** 关闭状态下的值 */
		inactiveValue: {
			type: [Boolean, String, Number] as PropType<TYPES.ISwitchModelValue>,
			default: false,
		},
		/** 开启状态下的文本 */
		activeLabel: {
			type: String,
			default: '',
		},
		/** 关闭状态下的文本 */
		inactiveLabel: {
			type: String,
			default: '',
		},
		/** 开启状态下的颜色 */
		activeColor: {
			type: String,
			default: 'rgba(99, 185, 49, 1)',
		},
		/** 关闭状态下的颜色 */
		inactiveColor: {
			type: String,
			default: 'rgba(201, 27, 38, 1)',
		},
	},
	setup(props: TYPES.ISwitchProps, context) {
		const state = reactive({
			isChecked: false,
		});
		const app = ref(getCurrentInstance()).value;

		watch(
			toRef(props, 'modelValue'),
			() => {
				if (typeof props.modelValue === 'boolean') {
					state.isChecked = props.modelValue;
				}
			},
			{ immediate: true }
		);

		function handleChange(e: MouseEvent) {}

		return {
			props,
			context,
			app,
			state,
			handleChange,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Switch.scss';
</style>
