<template>
	<div
		:class="{
			'v3-input-textarea': true,
			'v3-textarea--autoheight': state.defaultProps.autoHeight,
			'v3-textarea--disabled': state.defaultProps.disabled,
		}"
	>
		<textarea
			:value="props.modelValue"
			:style="{
				width: `${state.defaultProps.width}px`,
				height: `${state.defaultProps.height}px`,
			}"
			:disabled="state.defaultProps.disabled"
			:readonly="state.defaultProps.readonly"
			:placeholder="state.defaultProps.placeholder"
			:class="{
				[`v3-textarea--${state.defaultProps.resize}`]: true,
			}"
			@input="handleInput"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
		></textarea>
	</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref, watch } from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3InputTextarea',
	props: {
		width: Number as () => TYPES.ITextareaWidth,
		height: Number as () => TYPES.ITextareaHeight,
		resize: String as () => TYPES.ITextareaResize,
		autoHeight: Boolean as () => TYPES.ITextareaAutoHeight,
		disabled: Boolean as () => TYPES.ITextareaDisabled,
		readonly: Boolean as () => TYPES.ITextareaReadonly,
		placeholder: String as () => TYPES.ITextareaPlaceholder,
		modelValue: String,
	},
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				width: 150,
				height: 150,
				autoHeight: false,
				resize: 'vertical',
				disabled: false,
				placeholder: '请输入内容',
				readonly: false,
			},
		});
		const app = getCurrentInstance();

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
		};
	},
});
</script>
<style lang="scss" scoped>
@import './InputTextarea.scss';
</style>
