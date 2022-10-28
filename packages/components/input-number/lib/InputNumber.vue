<template>
	<div
		:class="{
			'v3-input-number': true,
			'is-disabled': props.disabled,
		}"
	>
		<v3-input
			v-model="state.inputValue"
			:type="'text'"
			:disabled="props.disabled"
			:readonly="props.readonly"
			:size="props.size"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
		>
			<template #prepend v-if="props.controlsPosition !== 'right'">
				<div
					v-if="props.controlsPosition === 'both'"
					:class="{
						'v3-number__minus-wrapper': true,
						[`is-position-${props.controlsPosition}`]: true,
						'is-disabled': state.isMinusDisabled,
					}"
					@click="handleMinus"
				>
					<i class="v3-icon v3-icon-sami-select"></i>
				</div>

				<div
					v-if="props.controlsPosition === 'left'"
					:class="{
						'v3-number__control-wrapper': true,
						[`is-position-${props.controlsPosition}`]: true,
					}"
				>
					<div
						:class="{
							'v3-number__control-plus': true,
							'is-disabled': state.isPlusDisabled,
						}"
						@click="handlePlus"
					>
						<i class="v3-icon v3-icon-arrow-up"></i>
					</div>
					<div
						:class="{
							'v3-number__control-minus': true,
							'is-disabled': state.isMinusDisabled,
						}"
						@click="handleMinus"
					>
						<i class="v3-icon v3-icon-arrow-down"></i>
					</div>
				</div>
			</template>

			<template #append v-if="props.controlsPosition !== 'left'">
				<div
					v-if="props.controlsPosition === 'both'"
					:class="{
						'v3-number__plus-wrapper': true,
						[`is-position-${props.controlsPosition}`]: true,
						'is-disabled': state.isPlusDisabled,
					}"
					@click="handlePlus"
				>
					<i class="v3-icon v3-icon-add-select"></i>
				</div>

				<div
					v-if="props.controlsPosition === 'right'"
					:class="{
						'v3-number__control-wrapper': true,
						[`is-position-${props.controlsPosition}`]: true,
					}"
				>
					<div
						:class="{
							'v3-number__control-plus': true,
							'is-disabled': state.isPlusDisabled,
						}"
						@click="handlePlus"
					>
						<i class="v3-icon v3-icon-arrow-up"></i>
					</div>
					<div
						:class="{
							'v3-number__control-minus': true,
							'is-disabled': state.isMinusDisabled,
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
	PropType,
	reactive,
	toRef,
	watch,
} from 'vue';
import V3Input from 'input';
import * as TYPES from '@felibrary/vue3-ui';

export default defineComponent({
	name: 'V3InputNumber',
	components: {
		V3Input,
	},
	props: {
		/** 限制输入的最小值 */
		min: {
			type: [Number, undefined] as PropType<TYPES.INumberMin>,
			default: undefined,
		},
		/** 限制输入的最大值 */
		max: {
			type: [Number, undefined] as PropType<TYPES.INumberMax>,
			default: undefined,
		},
		/** 步数 */
		step: {
			type: Number,
			default: 1,
		},
		/** 输入值是否只能为 step 的倍数 */
		stepStrictly: {
			type: Boolean,
			default: false,
		},
		/** 保留的小数位数 */
		precision: {
			type: Number,
			default: 0,
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 是否只读 */
		readonly: {
			type: Boolean,
			default: false,
		},
		/** 控制栏的位置 */
		controlsPosition: {
			type: String as PropType<TYPES.INumberControlsPosition>,
			default: 'both',
			validator: (v: string) => {
				return ['both', 'right', 'left'].includes(v);
			},
		},
		placeholder: {
			type: String,
			default: '请输入内容',
		},
		/** 输入框的尺寸 */
		size: {
			type: String as PropType<TYPES.IInputSize>,
			default: 'medium',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
		modelValue: {
			type: Number,
			required: true,
		},
	},
	setup(props: TYPES.IInputNumberProps, context) {
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
			toRef(props, 'modelValue'),
			newValue => {
				if (typeof newValue === 'number' && !isNaN(newValue)) {
					// 如果超出最大值或者低于最小值，则自动重置为最大值或最小值
					if (newValue < props.min! && typeof props.min === 'number') {
						const valToNumber = Number.parseFloat(
							props.min.toFixed(props.precision)
						);

						state.inputValue = `${valToNumber}`;
						context.emit('update:modelValue', valToNumber);
					} else if (newValue > props.max! && typeof props.min === 'number') {
						const valToNumber = Number.parseFloat(
							props.max!.toFixed(props.precision)
						);

						state.inputValue = `${props.max}`;
						context.emit('update:modelValue', valToNumber);
					} else {
						state.inputValue = `${newValue}`;
					}

					// 同时需要设置控制按钮的禁用状态
					state.isMinusDisabled =
						typeof props.min === 'number' && newValue === props.min;
					state.isPlusDisabled =
						typeof props.min === 'number' && newValue === props.max;
				}
			},
			{ immediate: true }
		);

		function handleChange(e: Event) {
			const target = e.target as HTMLTextAreaElement;
			let value = null;

			// 如果限制了输入值只能是步数（step）的倍数
			if (props.stepStrictly) {
				value = Number.parseInt(target.value);
				value += value % props.step === 0 ? 0 : 1;
			} else {
				value = Number.parseFloat(target.value);
			}

			let valToString = value.toFixed(props.precision);
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
			if (!props.disabled && !props.readonly && !state.isPlusDisabled) {
				context.emit('update:modelValue', props.modelValue! + props.step);
			}
		}

		/**
		 * 递减
		 */
		function handleMinus() {
			// 在禁用、只读或者超出最大值的状态下不可点击
			if (!props.disabled && !props.readonly && !state.isMinusDisabled) {
				context.emit('update:modelValue', props.modelValue! - props.step);
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
<style lang="scss">
@import './InputNumber.scss';
</style>
