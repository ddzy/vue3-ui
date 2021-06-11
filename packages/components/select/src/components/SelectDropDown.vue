<template>
	<ul
		:class="{
			[`v3-select-dropdown__list`]: true,
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
		/** V3Select 的实例 */
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
