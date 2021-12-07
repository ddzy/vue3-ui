<template>
	<div class="v3-carousel">轮播图</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/carousel';
import { computed, defineComponent, PropType, reactive, watch } from 'vue';

interface IState {}

export default defineComponent({
	name: 'V3Carousel',
	components: {},
	props: {},
	setup(props: TYPES.ICarouselProps, context) {
		const state: IState = reactive({
			strokeDashArray: '',
		});

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Carousel.scss';
</style>
