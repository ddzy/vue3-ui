<template>
	<div
		:class="{
			'v3-checkbox-group': true,
		}"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@typings/index';
import {
	CHECKBOX_GROUP_ADD_INSTANCE_FUNC_PROVIDE,
	CHECKBOX_GROUP_CHANGE_FUNC_PROVIDE,
	CHECKBOX_GROUP_INSTANCE_PROVIDE,
} from '@common/constants/provide-symbol';
import {
	Component,
	defineComponent,
	getCurrentInstance,
	nextTick,
	PropType,
	provide,
	reactive,
	watch,
} from 'vue';

export default defineComponent({
	name: 'V3CheckboxGroup',
	props: {
		modelValue: {
			type: Array as PropType<TYPES.ICheckboxLabel[]>,
			default: [],
		},
		/** 限制的最小选择个数 */
		min: {
			type: [Number, undefined] as PropType<TYPES.ICheckboxGroupMin>,
			default: undefined,
		},
		/** 限制的最大选择个数 */
		max: {
			type: [Number, undefined] as PropType<TYPES.ICheckboxGroupMax>,
			default: undefined,
		},
	},
	emits: ['change', 'update:modelValue'],

	setup(props: TYPES.ICheckboxGroupProps, context) {
		const state = reactive({
			/** checkbox 实例列表 */
			checkboxInstanceList: [],
		}) as {
			checkboxInstanceList: any[];
		};
		const app = getCurrentInstance();

		watch(
			props,
			() => {
				let min = props.min ? (props.min >= 0 ? props.min : 0) : 0;
				let max = props.max;

				if (min === max) {
					return;
				}

				// 如果做了最大/最小选择个数的限制，则要做相应的处理
				else if (max) {
					// 如果已选中的个数大于等于最大值，那么禁用其它还未选中的复选框
					if (props.modelValue.length >= max) {
						nextTick(() => {
							state.checkboxInstanceList.forEach(instance => {
								if (!props.modelValue.includes(instance.proxy.label)) {
									instance.proxy.state.defaultProps.disabled = true;
								}
							});
						});
					}
					// 如果已选中的个数小于等于最小值，那么禁用已选中的
					else if (props.modelValue.length <= min) {
						nextTick(() => {
							state.checkboxInstanceList.forEach(instance => {
								if (props.modelValue.includes(instance.proxy.label)) {
									instance.proxy.state.defaultProps.disabled = true;
								}
							});
						});
					}

					// 如果已选中的个数大于最小值并且小于最大值，那么对于所有原本不为 disabled 状态的复选框，取消禁用
					else if (
						props.modelValue.length > min &&
						props.modelValue.length < max
					) {
						nextTick(() => {
							state.checkboxInstanceList.forEach(instance => {
								if (!instance.proxy.disabled) {
									instance.proxy.state.defaultProps.disabled = false;
								}
							});
						});
					}
				}
			},
			{ immediate: true }
		);

		provide(CHECKBOX_GROUP_CHANGE_FUNC_PROVIDE, handleChange);
		provide(CHECKBOX_GROUP_INSTANCE_PROVIDE, app);
		provide(CHECKBOX_GROUP_ADD_INSTANCE_FUNC_PROVIDE, addCheckboxInstance);

		function handleChange(
			newValue: boolean,
			label: TYPES.ICheckboxLabel,
			e: MouseEvent
		) {
			// 如果【选中】的话，把该复选框的值加到数组里面
			// 反之，从数组中移除
			const newModelValue: TYPES.ICheckboxLabel[] = !newValue
				? props.modelValue.filter(v => {
						return v !== label;
				  })
				: props.modelValue.concat(label);

			context.emit('update:modelValue', newModelValue);
			context.emit('change', newModelValue, e);
		}

		/**
		 * 将子 Checkbox 的实例统一追加到列表中
		 */
		function addCheckboxInstance(instance: Component) {
			state.checkboxInstanceList = state.checkboxInstanceList.concat(instance);
		}

		return {
			state,
			props,
			app,
			handleChange,
		};
	},
});
</script>
<style lang="scss">
@import './CheckboxGroup.scss';
</style>
