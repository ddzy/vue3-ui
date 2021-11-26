<template>
	<div class="v3-progress-linear">线性进度条</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/slider';
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	PropType,
	reactive,
	ref,
} from 'vue';
import * as UTILS from '@common/utils/index';

interface IState {}

export default defineComponent({
	name: 'V3ProgressLinear',
	components: {},
	props: {},
	setup(props, context) {
		const state: IState = reactive({});

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './ProgressLinear.scss';
</style>
