<template>
	<div
		:class="{
			'v3-radio-button': true,
			'is-disabled': props.disabled,
			'is-checked': props.label === state.radioValue,
			[`is-size--${props.size}`]: props.size,
		}"
	>
		<label
			class="v3-radio-button__label-wrapper"
			:for="`v3-radio-button__input--${app.uid}`"
		>
			<input
				ref="radioRef"
				type="radio"
				class="v3-radio-button__input"
				v-model="state.radioValue"
				:value="props.label"
				:id="`v3-radio-button__input--${app.uid}`"
				:disabled="props.disabled"
				@change="handleChange"
			/>

			<div class="v3-radio-button__label">
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
	inject,
	ComponentOptionsWithObjectProps,
} from 'vue';
import * as TYPES from '@typings/index';
import {
	RADIO_GROUP_CHANGE_FUNC_PROVIDE,
	RADIO_GROUP_INSTANCE_PROVIDE,
} from '@common/constants/provide-symbol';

export default defineComponent({
	name: 'V3RadioButton',
	props: {
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 单选框的值 */
		label: {
			type: [String, Number, Boolean] as PropType<TYPES.IRadioLabel>,
			default: '',
		},
		modelValue: {
			type: [String, Number, Boolean] as PropType<TYPES.IRadioLabel>,
			default: '',
		},
		/** 单选框尺寸 */
		size: {
			type: String as PropType<TYPES.IRadioSize>,
			default: 'medium',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
	},
	emits: ['change', 'update:modelValue'],
	setup(props: Required<TYPES.IRadioButtonProps>, context) {
		const state = reactive({
			/** 单选框的值 */
			radioValue: null,
			/** RadioGroup 的 change 事件 */
			injectedOnRadioGroupChange: null,
			/** RadioGroup 实例 */
			injectedRadioGroupInstance: null,
		});
		const app = getCurrentInstance()!;
		const radioRef = ref(document.createElement('input'));
		const isRadioGroup = checkIsRadioGroup();

		if (isRadioGroup) {
			(state.injectedOnRadioGroupChange as unknown as Function) = inject(
				RADIO_GROUP_CHANGE_FUNC_PROVIDE,
			)!;
			(state.injectedRadioGroupInstance as unknown as Function) = inject(
				RADIO_GROUP_INSTANCE_PROVIDE,
			)!;
		}

		watch(
			toRef(
				isRadioGroup
					? (
							state.injectedRadioGroupInstance! as ComponentOptionsWithObjectProps
					  ).props
					: props,
				'modelValue',
			),
			(newValue) => {
				state.radioValue = newValue as any;
			},
			{ immediate: true },
		);

		/**
		 * 检查当前单选器的父级是否存在单选器组
		 */
		function checkIsRadioGroup() {
			let parent = app!.parent;
			let result = false;

			while (parent) {
				if (parent.type.name === 'V3RadioGroup') {
					result = true;
					break;
				}
				parent = parent.parent;
			}

			return result;
		}

		function handleChange(e: MouseEvent) {
			if (isRadioGroup) {
				(state.injectedOnRadioGroupChange as unknown as Function)(
					state.radioValue,
					e,
				);
			} else {
				context.emit('update:modelValue', state.radioValue);
				context.emit('change', props.label, state.radioValue, e);
			}
		}

		return {
			state,
			props,
			app,
			handleChange,
			radioRef,
		};
	},
	methods: {},
});
</script>
<style lang="scss">
@import './RadioButton.scss';
</style>
