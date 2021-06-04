<template>
	<div
		:class="{
			['v3-select']: true,
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
	provide,
	reactive,
} from 'vue';

import * as TYPES from '@/public/types/select';

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
<style lang="scss" scoped>
@import './Select.scss';
</style>
