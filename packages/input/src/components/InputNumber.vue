<template>
	<div
		:class="{
			'v3-input-number': true,
			'v3-input-number--disabled': state.defaultProps.disabled,
		}"
	>
		<input
			type="text"
			@input="handleInput"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
		/>
	</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref, watch } from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3InputNumber',
	props: {
		min: Number as () => TYPES.INumberMin,
		max: Number as () => TYPES.INumberMax,
		step: Number as () => TYPES.INumberStep,
		stepStrictly: Boolean as () => TYPES.INumberStepStrictly,
		precision: Number as () => TYPES.INumberPrecision,
		disabled: Boolean as () => TYPES.INumberDisabled,
		readonly: Boolean as () => TYPES.INumberReadonly,
		controlsPosition: String as () => TYPES.INumberControlsPosition,
		placeholder: String as () => TYPES.INumberPlaceholder,
		modelValue: String,
	},
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				min: 0,
				max: 0,
				step: 1,
				stepStrictly: false,
				precision: 0,
				disabled: false,
				readonly: false,
				controlsPosition: 'both',
				placeholder: '请输入内容',
			},
		});
		const app = getCurrentInstance();
		const textareaRef = ref(document.createElement('textarea'));

		watch(
			props,
			() => {
				state.defaultProps = {
					...state.defaultProps,
					...reactive(props),
				};
			},
			{ immediate: true }
		);

		function handleChange(e: Event) {
			const target = e.target as HTMLTextAreaElement;
			context.emit('update:modelValue', target.value);
		}

		function handleInput(e: Event) {
			const target = e.target as HTMLTextAreaElement;
			context.emit('update:modelValue', target.value);
		}

		function handleFocus(e: Event) {
			context.emit('focus', e);
		}

		function handleBlur(e: Event) {
			context.emit('blur', e);
		}

		return {
			state,
			props,
			app,
			handleChange,
			handleInput,
			handleFocus,
			handleBlur,
			textareaRef,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './InputTextarea.scss';
</style>
