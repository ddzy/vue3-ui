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
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	provide,
} from 'vue';
import * as TYPES from '../index';
import {
	CHECKBOX_GROUP_CHANGE_FUNC_PROVIDE,
	CHECKBOX_GROUP_INSTANCE_PROVIDE,
} from '../../../../packages/common/constants/provide-symbol';

export default defineComponent({
	name: 'V3CheckboxGroup',
	props: {
		modelValue: Array as PropType<TYPES.ICheckboxLabel[]>,
	},
	emits: ['change', 'update:modelValue'],

	setup(props, context) {
		const state = reactive({});
		const app = getCurrentInstance();

		function handleChange(newValue, label, e) {
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

		provide(CHECKBOX_GROUP_CHANGE_FUNC_PROVIDE, handleChange);
		provide(CHECKBOX_GROUP_INSTANCE_PROVIDE, app);

		return {
			state,
			props,
			app,
			handleChange,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './CheckboxGroup.scss';
</style>
