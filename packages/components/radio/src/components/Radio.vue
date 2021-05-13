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
	inject,
} from 'vue';
import * as TYPES from '@/public/types/radio';
import {
	RADIO_GROUP_CHANGE_FUNC_PROVIDE,
	RADIO_GROUP_INSTANCE_PROVIDE,
} from '@common/constants/provide-symbol';

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
			/** RadioGroup 的 change 事件 */
			injectedOnRadioGroupChange: null || undefined,
			/** RadioGroup 实例 */
			injectedRadioGroupInstance: null || undefined,
		});
		const app = getCurrentInstance();
		const radioRef = ref(document.createElement('input'));
		const isRadioGroup = checkIsRadioGroup();

		if (isRadioGroup) {
			state.injectedOnRadioGroupChange = inject(
				RADIO_GROUP_CHANGE_FUNC_PROVIDE
			);
			state.injectedRadioGroupInstance = inject(RADIO_GROUP_INSTANCE_PROVIDE);
		}

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
			toRef(
				isRadioGroup ? (state.injectedRadioGroupInstance as any).props : props,
				'modelValue'
			),
			(newValue: any) => {
				state.radioValue = newValue;
			},
			{ immediate: true }
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
				((state.injectedOnRadioGroupChange as unknown) as Function)(
					state.radioValue,
					e
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
<style lang="scss" scoped>
@import './Radio.scss';
</style>
