<template>
	<div class="v3-slider">
		slider
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import * as TYPES from '@/public/types/slider';

interface IState {}

export default defineComponent({
	name: 'V3Slider',
	props: {},
	setup(props: TYPES.ISliderProps, context) {
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
@import './Slider.scss';
</style>
