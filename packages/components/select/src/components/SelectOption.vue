<template>
	<li
		:class="{
			[`v3-select-dropdown__item`]: true,
			[`is-disabled`]: props.disabled,
			[`is-selected`]: false,
		}"
	>
		{{ props.label || props.value }}
	</li>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/select';
import { defineComponent, getCurrentInstance, PropType, reactive } from 'vue';

export default defineComponent({
	name: 'V3SelectOption',
	props: {
		/** 显示的文本 */
		label: {
			type: String,
			default: '',
		},
		/** 对应的值 */
		value: {
			type: [String, Boolean, Number, Object] as PropType<TYPES.ISelectValue>,
			required: true,
		},
		/** 是否禁用当前选项 */
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const state = reactive({});
		const app = getCurrentInstance();

		return {
			app,
			state,
			props,
		};
	},
});
</script>
<style lang="scss">
@import '@common/styles/global-animation.scss';
</style>
<style lang="scss" scoped>
@import './Select.scss';
</style>
