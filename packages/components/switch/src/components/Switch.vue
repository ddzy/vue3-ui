<template>
	<div
		:class="{
			'v3-switch': true,
			'is-disabled': props.disabled,
			'is-loading': props.loading,
			'is-active': state.isChecked,
		}"
		:style="{
			'--active-color': hexToRgba(props.activeColor, 1),
			'--inactive-color': hexToRgba(props.inactiveColor, 1),
			'--active-color-half': hexToRgba(props.activeColor, 0.5),
			'--inactive-color-half': hexToRgba(props.inactiveColor, 0.5),
			'--active-color-little': hexToRgba(props.activeColor, 0.3),
			'--inactive-color-little': hexToRgba(props.inactiveColor, 0.3),
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
		<div class="v3-switch__select" @click="handleSwitch"></div>
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
import { hexToRgba } from '@common/utils/index';
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
		/** 开启状态下的颜色（必须为16进制格式） */
		activeColor: {
			type: String,
			default: '#63B931',
		},
		/** 关闭状态下的颜色（必须为16进制格式） */
		inactiveColor: {
			type: String,
			default: '#C91B26',
		},
	},
	setup(props: TYPES.ISwitchProps, context) {
		const state = reactive({
			/** 当前开关是否选中 */
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

		function handleChange(e: MouseEvent) {
			if (typeof props.modelValue === 'boolean') {
				context.emit('update:modelValue', state.isChecked);
			}
		}

		function handleSwitch() {
			if (typeof props.modelValue === 'boolean') {
				context.emit('update:modelValue', !state.isChecked);
			}
		}

		return {
			props,
			context,
			app,
			state,
			hexToRgba,
			handleChange,
			handleSwitch,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Switch.scss';
</style>
