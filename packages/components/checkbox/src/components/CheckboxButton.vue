<template>
	<div
		:class="{
			'v3-checkbox-button': true,
			'v3-checkbox-button--disabled': state.defaultProps.disabled,
			'v3-checkbox-button--checked': !!state.checkboxValue,
		}"
	>
		<label
			class="v3-checkbox-button__label-wrapper"
			:for="`v3-checkbox-button__input--${app.uid}`"
		>
			<input
				ref="checkboxRef"
				type="checkbox"
				class="v3-checkbox-button__input"
				v-model="state.checkboxValue"
				:value="props.label"
				:id="`v3-checkbox-button__input--${app.uid}`"
				:disabled="state.defaultProps.disabled"
				@change="handleChange"
			/>

			<div class="v3-checkbox-button__label">
				<slot v-if="app.slots.default"></slot>
				<span v-else>{{
					isCheckboxGroup ? props.modelValue : props.label
				}}</span>
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
	onMounted,
} from 'vue';
import * as TYPES from '@/public/types/checkbox';
import {
	CHECKBOX_GROUP_ADD_INSTANCE_FUNC_PROVIDE,
	CHECKBOX_GROUP_CHANGE_FUNC_PROVIDE,
	CHECKBOX_GROUP_INSTANCE_PROVIDE,
} from '@common/constants/provide-symbol';

export default defineComponent({
	name: 'V3CheckboxButton',
	props: {
		disabled: Boolean as PropType<TYPES.ICheckboxDisabled>,
		label: [String, Number, Boolean] as PropType<TYPES.ICheckboxLabel>,
		modelValue: [String, Number, Boolean] as PropType<TYPES.ICheckboxLabel>,
	},
	emits: ['change', 'update:modelValue'],
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				disabled: false,
			},
			/** 复选框的值 */
			checkboxValue: null,
			/** CheckboxGroup 的 change 事件 */
			injectedOnCheckboxGroupChange: null,
			/** CheckboxGroup 实例 */
			injectedCheckboxGroupInstance: null,
			/** CheckboxGroup 的追加当前实例方法 */
			injectedCheckboxGroupAppendInstance: null,
		});
		const app = ref(getCurrentInstance());
		const checkboxRef = ref(document.createElement('input'));
		const isCheckboxGroup = checkIsCheckboxGroup();

		if (isCheckboxGroup) {
			state.injectedOnCheckboxGroupChange = inject(
				CHECKBOX_GROUP_CHANGE_FUNC_PROVIDE
			);
			state.injectedCheckboxGroupInstance = inject(
				CHECKBOX_GROUP_INSTANCE_PROVIDE
			);
			state.injectedCheckboxGroupAppendInstance = inject(
				CHECKBOX_GROUP_ADD_INSTANCE_FUNC_PROVIDE
			);
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
				isCheckboxGroup ? state.injectedCheckboxGroupInstance.props : props,
				'modelValue'
			),
			newValue => {
				// 判断选中状态
				if (isCheckboxGroup) {
					state.checkboxValue = newValue.includes(props.label);
				} else {
					state.checkboxValue = (newValue as unknown) as boolean;
				}
			},
			{ immediate: true }
		);

		onMounted(() => {
			if (isCheckboxGroup) {
				state.injectedCheckboxGroupAppendInstance(app.value);
			}
		});

		/**
		 * 检查当前单选器的父级是否存在复选器组
		 */
		function checkIsCheckboxGroup() {
			let parent = app.value.parent;
			let result = false;

			while (parent) {
				if (parent.type.name === 'V3CheckboxGroup') {
					result = true;
					break;
				}
				parent = parent.parent;
			}

			return result;
		}

		function handleChange(e) {
			if (isCheckboxGroup) {
				state.injectedOnCheckboxGroupChange(
					state.checkboxValue,
					props.label,
					e
				);
			} else {
				context.emit('update:modelValue', state.checkboxValue);
				context.emit('change', state.checkboxValue, e);
			}
		}

		return {
			state,
			props,
			app: app.value,
			handleChange,
			checkboxRef,
			isCheckboxGroup,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped>
@import './CheckboxButton.scss';
</style>
