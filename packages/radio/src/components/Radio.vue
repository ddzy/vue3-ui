<template>
	<div
		:class="{
			'v3-radio': true,
			'v3-radio--disabled': state.defaultProps.disabled,
			'v3-radio--bordered': state.defaultProps.border,
			'v3-radio--checked': props.label === state.radioValue,
		}"
	>
		<label class="v3-radio__label-wrapper" :for="`v3-radio__input--${app.uid}`">
			<input
				ref="radioRef"
				type="radio"
				class="v3-radio__input"
				v-model="state.radioValue"
				:value="props.label"
				:id="`v3-radio__input--${app.uid}`"
				:disabled="state.defaultProps.disabled"
				@change="handleChange"
			/>

			<div class="v3-radio__select"></div>
			<div class="v3-radio__label">
				<slot></slot>
			</div>
		</label>
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
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3Radio',
	props: {
		border: Boolean as PropType<TYPES.IRadioBorder>,
		disabled: Boolean as PropType<TYPES.IRadioDisabled>,
		label: [String, Number, Boolean] as PropType<TYPES.IRadioLabel>,
		modelValue: [String, Number, Boolean] as PropType<TYPES.IRadioLabel>,
	},
	emits: ['change', 'update:modelValue'],
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				border: false,
				disabled: false,
			},
			/** 单选框的值 */
			radioValue: null,
		});
		const app = getCurrentInstance();
		const radioRef = ref(document.createElement('input'));

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
				state.radioValue = newValue;
			},
			{ immediate: true }
		);

		function handleChange(e) {
			context.emit('update:modelValue', state.radioValue);
			context.emit('change', props.label, e);
		}

		return {
			state,
			props,
			app,
			handleChange,
			radioRef,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Radio.scss';
</style>
