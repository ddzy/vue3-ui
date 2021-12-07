<template>
	<div class="v3-carousel-item">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/carousel';
import { computed, defineComponent, PropType, reactive, watch } from 'vue';

interface IState {}

export default defineComponent({
	name: 'V3CarouselItem',
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
@import './CarouselItem.scss';
</style>
