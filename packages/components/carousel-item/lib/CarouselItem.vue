<template>
	<transition :name="computedTransitionName">
		<div
			v-show="active"
			:class="{
				'v3-carousel__item': true,
				'is-active': active,
			}"
			:style="{
				transitionDuration: `${carousel?.props.duration}ms`,
				transitionTimingFunction: `${carousel?.props.timingFunction}`,
			}"
		>
			<slot></slot>
		</div>
	</transition>
</template>
<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue';

import { CAROUSEL_PROVIDE } from '@common/constants/provide-symbol';

import { ICarouselItemProps, ICarouselProvide } from '@/public/typings';

defineOptions({
	name: 'V3CarouselItem',
});

const props = withDefaults(defineProps<ICarouselItemProps>(), {});
const carousel = inject<ICarouselProvide>(CAROUSEL_PROVIDE);

const active = ref(false);
function updateActive(newActive: boolean) {
	active.value = newActive;
}

const computedTransitionName = computed(() => {
	let name =
		carousel?.props.effect === 'slide'
			? `v3-carousel-item-${carousel?.props.direction}-${carousel?.props.effect}-${carousel?.slideDirection.value}`
			: `v3-carousel-item-${carousel?.props.effect}`;
	return name;
});

// 挂载后将当前 CarouselItem 储存到 Carousel 中统一管理
onMounted(() => {
	if (carousel) {
		carousel.addCarouselItem({
			props,
			updateActive,
		});
	}
});
</script>
<style lang="scss">
@import './CarouselItem.scss';
</style>
