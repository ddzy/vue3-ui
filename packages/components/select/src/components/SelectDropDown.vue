<template>
	<div>12345</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/select';
import { defineComponent, getCurrentInstance, reactive } from 'vue';

export default defineComponent({
	name: 'V3Select',
	props: {},
	setup(props: TYPES.ISelectProps) {
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
