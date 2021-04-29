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
			:disabled="state.defaultProps.disabled"
			:readonly="state.defaultProps.readonly"
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
						'v3-number__control--disabled': state.isMinusDisabled,
					}"
					@click="handleMinus"
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
					<div
						:class="{
							'v3-number__control-plus': true,
							'v3-number__control--disabled': state.isPlusDisabled,
						}"
						@click="handlePlus"
					>
						<i class="v3-icon v3-icon-arrow-up"></i>
					</div>
					<div
						:class="{
							'v3-number__control-minus': true,
							'v3-number__control--disabled': state.isMinusDisabled,
						}"
						@click="handleMinus"
					>
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
						'v3-number__control--disabled': state.isPlusDisabled,
					}"
					@click="handlePlus"
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
					<div
						:class="{
							'v3-number__control-plus': true,
							'v3-number__control--disabled': state.isPlusDisabled,
						}"
						@click="handlePlus"
					>
						<i class="v3-icon v3-icon-arrow-up"></i>
					</div>
					<div
						:class="{
							'v3-number__control-minus': true,
							'v3-number__control--disabled': state.isMinusDisabled,
						}"
						@click="handleMinus"
					>
						<i class="v3-icon v3-icon-arrow-down"></i>
					</div>
				</div>
			</template>
		</v3-input>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	reactive,
	toRef,
	watch,
} from 'vue';
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
		modelValue: Number,
	},
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				min: null,
				max: null,
				step: 1,
				stepStrictly: false,
				precision: 0,
				disabled: false,
				readonly: false,
				controlsPosition: 'both',
				placeholder: '请输入内容',
				modelValue: null,
			},
			inputValue: '',
			/** 【递增】按钮的禁用状态 */
			isPlusDisabled: false,
			/** 【递减】按钮的禁用状态 */
			isMinusDisabled: false,
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
		watch(
			toRef(props, 'modelValue'),
			newValue => {
				if (typeof newValue === 'number' && !isNaN(newValue)) {
					// 如果超出最大值或者低于最小值，则自动重置为最大值或最小值
					if (newValue < props.min && props.min !== null) {
						const valToNumber = Number.parseFloat(
							props.min.toFixed(state.defaultProps.precision)
						);

						state.inputValue = `${valToNumber}`;
						context.emit('update:modelValue', valToNumber);
					} else if (newValue > props.max && props.min !== null) {
						const valToNumber = Number.parseFloat(
							props.max.toFixed(state.defaultProps.precision)
						);

						state.inputValue = `${props.max}`;
						context.emit('update:modelValue', valToNumber);
					} else {
						state.inputValue = `${newValue}`;
					}

					// 同时需要设置控制按钮的禁用状态
					state.isMinusDisabled = props.min !== null && newValue === props.min;
					state.isPlusDisabled = props.min !== null && newValue === props.max;
				}
			},
			{ immediate: true }
		);

		function handleChange(e: Event) {
			const target = e.target as HTMLTextAreaElement;
			let value = null;

			// 如果限制了输入值只能是步数（step）的倍数
			if (state.defaultProps.stepStrictly) {
				value = Number.parseInt(target.value);
				value += value % state.defaultProps.step === 0 ? 0 : 1;
			} else {
				value = Number.parseFloat(target.value);
			}

			let valToString = value.toFixed(state.defaultProps.precision);
			let valToNumber = Number.parseFloat(valToString);

			context.emit('update:modelValue', valToNumber);
			// 再次格式化输入框中的值
			state.inputValue = valToString;
		}

		function handleFocus(e: Event) {
			context.emit('focus', e);
		}

		function handleBlur(e: Event) {
			context.emit('blur', e);
		}

		/**
		 * 递增
		 */
		function handlePlus() {
			// 在禁用、只读或者超出最大值的状态下不可点击
			if (
				!state.defaultProps.disabled &&
				!state.defaultProps.readonly &&
				!state.isPlusDisabled
			) {
				context.emit(
					'update:modelValue',
					state.defaultProps.modelValue + state.defaultProps.step
				);
			}
		}

		/**
		 * 递减
		 */
		function handleMinus() {
			// 在禁用、只读或者超出最大值的状态下不可点击
			if (
				!state.defaultProps.disabled &&
				!state.defaultProps.readonly &&
				!state.isMinusDisabled
			) {
				context.emit(
					'update:modelValue',
					state.defaultProps.modelValue - state.defaultProps.step
				);
			}
		}

		return {
			state,
			props,
			app,
			handleChange,
			handleFocus,
			handleBlur,
			handlePlus,
			handleMinus,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './InputNumber.scss';
</style>
