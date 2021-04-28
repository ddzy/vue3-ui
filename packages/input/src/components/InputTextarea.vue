<template>
	<div
		:class="{
			'v3-input-textarea': true,
			'v3-textarea--autoheight': state.defaultProps.autoHeight,
			'v3-textarea--disabled': state.defaultProps.disabled,
		}"
	>
		<textarea
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
		></textarea>
	</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, watch } from 'vue';
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
		return {
			state,
			props,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './InputTextarea.scss';
</style>
