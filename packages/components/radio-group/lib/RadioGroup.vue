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
import * as TYPES from '@felibrary/vue3-ui';
import {
	RADIO_GROUP_CHANGE_FUNC_PROVIDE,
	RADIO_GROUP_INSTANCE_PROVIDE,
} from '@common/constants/provide-symbol';

export default defineComponent({
	name: 'V3RadioGroup',
	props: {
		modelValue: {
			type: [String, Number, Boolean] as PropType<TYPES.IRadioLabel>,
			default: '',
		},
	},
	emits: ['change', 'update:modelValue'],

	setup(props: TYPES.IRadioGroupProps, context) {
		const state = reactive({});
		const app = getCurrentInstance();

		function handleChange(v: MouseEvent, e: TYPES.IRadioLabel) {
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
<style lang="scss">
@import './RadioGroup.scss';
</style>
