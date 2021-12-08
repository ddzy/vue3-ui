<template>
	<div
		class="v3-carousel__item"
		:style="{
			width: `${state.width}px`,
		}"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	onMounted,
	reactive,
	ref,
} from 'vue';

interface IState {
	width: number;
}

export default defineComponent({
	name: 'V3CarouselItem',
	components: {},
	props: {},
	setup(props, context) {
		const state: IState = reactive({
			width: 0,
		});
		const app = ref(getCurrentInstance()).value;

		onMounted(() => {
			// 计算父组件（V3Carousel）的容器宽度
			const parentEl =
				app && app.parent && app.parent.proxy && app.parent.proxy.$el
					? (app.parent.proxy.$el as HTMLElement)
					: document.createElement('div');
			state.width = parentEl.getBoundingClientRect().width;
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
@import './CarouselItem.scss';
</style>
