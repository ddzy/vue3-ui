<template>
	<div
		:class="{
			'v3-input-number': true,
			'v3-input-number--disabled': state.defaultProps.disabled,
		}"
	>
		<v3-input
			v-model="state.inputValue"
			:type="'text'"
			@input="handleInput"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
		>
			<template #prepend v-if="state.defaultProps.controlsPosition !== 'right'">
				<div
					v-if="state.defaultProps.controlsPosition === 'both'"
					:class="{
						'v3-number__minus-wrapper': true,
						[`v3-number__control--${state.defaultProps.controlsPosition}`]: true,
					}"
				>
					<i class="v3-icon v3-icon-sami-select"></i>
				</div>

				<div
					v-if="state.defaultProps.controlsPosition === 'left'"
					:class="{
						'v3-number__control-wrapper': true,
						[`v3-number__control--${state.defaultProps.controlsPosition}`]: true,
					}"
				>
					<div class="v3-number__control-plus">
						<i class="v3-icon v3-icon-arrow-up"></i>
					</div>
					<div class="v3-number__control-minus">
						<i class="v3-icon v3-icon-arrow-down"></i>
					</div>
				</div>
			</template>

			<template #append v-if="state.defaultProps.controlsPosition !== 'left'">
				<div
					v-if="state.defaultProps.controlsPosition === 'both'"
					:class="{
						'v3-number__plus-wrapper': true,
						[`v3-number__control--${state.defaultProps.controlsPosition}`]: true,
					}"
				>
					<i class="v3-icon v3-icon-add-select"></i>
				</div>

				<div
					v-if="state.defaultProps.controlsPosition === 'right'"
					:class="{
						'v3-number__control-wrapper': true,
						[`v3-number__control--${state.defaultProps.controlsPosition}`]: true,
					}"
				>
					<div class="v3-number__control-plus">
						<i class="v3-icon v3-icon-arrow-up"></i>
					</div>
					<div class="v3-number__control-minus">
						<i class="v3-icon v3-icon-arrow-down"></i>
					</div>
				</div>
			</template>
		</v3-input>
	</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref, watch } from 'vue';
import V3Input from './Input.vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3InputNumber',
	components: {
		V3Input,
	},
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
			inputValue: '',
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
@import './InputNumber.scss';
</style>
