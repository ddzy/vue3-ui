<template>
	<div
		:class="{
			'v3-radio-group': true,
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
	RADIO_GROUP_CHANGE_FUNC_PROVIDE,
	RADIO_GROUP_INSTANCE_PROVIDE,
} from '../../../../packages/common/constants/provide-symbol';

export default defineComponent({
	name: 'V3RadioGroup',
	props: {
		modelValue: [String, Number, Boolean] as PropType<TYPES.IRadioLabel>,
	},
	emits: ['change', 'update:modelValue'],

	setup(props, context) {
		const state = reactive({});
		const app = getCurrentInstance();

		function handleChange(v, e) {
			context.emit('update:modelValue', v);
			context.emit('change', v, e);
		}

		provide(RADIO_GROUP_CHANGE_FUNC_PROVIDE, handleChange);
		provide(RADIO_GROUP_INSTANCE_PROVIDE, app);

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
@import './RadioGroup.scss';
</style>
