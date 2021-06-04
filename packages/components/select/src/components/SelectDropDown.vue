<template>
	<ul
		:class="{
			[`v3-select-dropdown__list`]: true,
		}"
		:style="{
			width: `${props.width}px`,
		}"
	>
		<li
			:class="{
				[`v3-select-dropdown__item`]: true,
				[`is-disabled`]: true,
				[`is-selected`]: true,
			}"
		>
			选项1
		</li>
		<li
			:class="{
				[`v3-select-dropdown__item`]: true,
				[`is-selected`]: true,
			}"
		>
			选项2
		</li>
		<li
			:class="{
				[`v3-select-dropdown__item`]: true,
				[`is-disabled`]: true,
			}"
		>
			选项3
		</li>
		<li
			:class="{
				[`v3-select-dropdown__item`]: true,
			}"
		>
			选项4
		</li>
		<li
			:class="{
				[`v3-select-dropdown__item`]: true,
			}"
		>
			选项5
		</li>
	</ul>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/select';
import { defineComponent, getCurrentInstance, reactive } from 'vue';

export default defineComponent({
	name: 'V3Select',
	props: {
		/** 下拉框的宽度（与 v3-select-trigger 相同） */
		width: {
			type: Number,
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
