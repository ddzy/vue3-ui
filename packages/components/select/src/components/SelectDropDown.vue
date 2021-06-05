<template>
	<ul
		:class="{
			[`v3-select-dropdown__list`]: true,
		}"
		:style="{
			width: `${props.width}px`,
		}"
	>
		<slot></slot>
	</ul>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive } from 'vue';

export default defineComponent({
	name: 'V3SelectDropDown',
	props: {
		/** 下拉框的宽度（与 v3-select-trigger 相同） */
		width: {
			type: Number,
			required: true,
		},
		selectInstance: {
			type: Object,
			required: true,
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
