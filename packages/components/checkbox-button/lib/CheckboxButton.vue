<template>
	<div
		:class="{
			'v3-checkbox-button': true,
			'is-disabled': state.defaultProps.disabled,
			'is-checked': !!state.checkboxValue,
			[`is-size--${props.size}`]: props.size,
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
	ComponentOptionsWithObjectProps,
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
		/** 复选框禁用状态 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 复选框的值 */
		label: {
			type: [String, Number, Boolean] as PropType<TYPES.ICheckboxLabel>,
			default: '',
		},
		/** 复选框的尺寸 */
		size: {
			type: String as PropType<TYPES.ICheckboxSize>,
			default: 'medium',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
		modelValue: {
			type: [String, Number, Boolean] as PropType<TYPES.ICheckboxLabel>,
			default: '',
		},
	},
	emits: ['change', 'update:modelValue'],
	setup(props: TYPES.ICheckboxButtonProps, context) {
		const state = reactive({
			defaultProps: {
				disabled: false,
			},
			/** 复选框的值 */
			checkboxValue: false,
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
			)!;
			state.injectedCheckboxGroupInstance = inject(
				CHECKBOX_GROUP_INSTANCE_PROVIDE
			)!;
			state.injectedCheckboxGroupAppendInstance = inject(
				CHECKBOX_GROUP_ADD_INSTANCE_FUNC_PROVIDE
			)!;
		}

		watch(
			props,
			() => {
				state.defaultProps.disabled = props.disabled;
			},
			{ immediate: true }
		);

		watch(
			toRef(
				isCheckboxGroup
					? (state.injectedCheckboxGroupInstance! as ComponentOptionsWithObjectProps)
							.props
					: props,
				'modelValue'
			),
			newValue => {
				// 判断选中状态
				if (isCheckboxGroup) {
					state.checkboxValue = (newValue as TYPES.ICheckboxLabel[]).includes(
						props.label!
					);
				} else {
					state.checkboxValue = (newValue as unknown) as boolean;
				}
			},
			{ immediate: true }
		);

		onMounted(() => {
			if (isCheckboxGroup) {
				((state.injectedCheckboxGroupAppendInstance as unknown) as Function)(
					app.value
				);
			}
		});

		/**
		 * 检查当前单选器的父级是否存在复选器组
		 */
		function checkIsCheckboxGroup() {
			let parent = app.value!.parent;
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

		function handleChange(e: MouseEvent) {
			if (isCheckboxGroup) {
				((state.injectedOnCheckboxGroupChange as unknown) as Function)(
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
<style lang="scss">
@import './CheckboxButton.scss';
</style>
