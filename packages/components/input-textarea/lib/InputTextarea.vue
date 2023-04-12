<template>
	<div
		:class="{
			'v3-input-textarea': true,
			'is-autoheight': props.autoHeight,
			'is-disabled': props.disabled,
		}"
	>
		<textarea
			ref="textareaRef"
			:style="{
				width: `${props.width}px`,
				height: `${state.defaultProps.height}px`,
			}"
			:value="props.modelValue"
			:disabled="props.disabled"
			:readonly="props.readonly"
			:placeholder="props.placeholder"
			:class="{
				[`is-resize-${props.resize}`]: true,
			}"
			@input="handleInput"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
		></textarea>
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
import * as TYPES from '@typings/index';

export default defineComponent({
	name: 'V3InputTextarea',
	props: {
		/** 输入框的宽度 */
		width: {
			type: Number,
			default: 150,
		},
		/** 输入框的高度 */
		height: {
			type: Number,
			default: 150,
		},
		/** 高度是否自适应 */
		autoHeight: {
			type: Boolean,
			default: false,
		},
		/** 拉伸的方向 */
		resize: {
			type: String as PropType<TYPES.ITextareaResize>,
			default: 'vertical',
			validator: (v: string) => {
				return ['none', 'both', 'horizontal', 'vertical'].includes(v);
			},
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '请输入内容',
		},
		/** 是否只读 */
		readonly: {
			type: Boolean,
			default: false,
		},
		modelValue: {
			type: String,
			default: '',
		},
	},
	setup(props: TYPES.ITextareaProps, context) {
		const state = reactive({
			defaultProps: {
				height: 0,
			},
		});
		const app = getCurrentInstance();
		const textareaRef = ref(document.createElement('textarea'));

		watch(
			props,
			() => {
				state.defaultProps.height = props.height;
			},
			{ immediate: true }
		);
		watch(
			toRef(props, 'modelValue'),
			() => {
				if (props.autoHeight && props.modelValue) {
					_autoHeight();
				}
			},
			{ immediate: true }
		);

		/**
		 * textarea 高度自适应
		 */
		function _autoHeight() {
			const { scrollHeight } = textareaRef.value;

			state.defaultProps.height = scrollHeight;
		}

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
<style lang="scss">
@import './InputTextarea.scss';
</style>
