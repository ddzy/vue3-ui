<template>
	<div
		v-if="!props.disableToTop || !props.disableToBottom"
		class="v3-back"
		:class="{
			'is-global': computedIsGlobal,
		}"
		:style="{
			zIndex: VARIABLE.getNextZIndex(),
		}"
	>
		<div
			v-if="!props.disableToTop && state.showTop"
			class="v3-back__top"
			@click="toTop"
		>
			<div v-if="!context.slots.top" class="v3-back-top__inner" title="去顶部">
				<i class="v3-icon v3-icon-arrow-up"></i>
			</div>
			<slot v-else name="top"></slot>
		</div>

		<div
			v-if="!props.disableToBottom && state.showBottom"
			class="v3-back__bottom"
			@click="toBottom"
		>
			<div
				v-if="!context.slots.bottom"
				class="v3-back-bottom__inner"
				title="去底部"
			>
				<i class="v3-icon v3-icon-arrow-down"></i>
			</div>
			<slot v-else name="bottom"></slot>
		</div>
	</div>
</template>
<script lang="ts">
import {
	computed,
	defineComponent,
	getCurrentInstance,
	nextTick,
	onBeforeUnmount,
	onMounted,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/back';
import VARIABLE from '@common/constants/internal-variable';
import * as UTILS from '@common/utils/index';

export default defineComponent({
	name: 'V3Back',
	props: {
		/** 页面滚动距离超过该值时显示去顶部按钮 */
		distance: {
			type: Number,
			default: 400,
		},
		/** 是否显示“去顶部”按钮 */
		disableToTop: {
			type: Boolean,
			default: false,
		},
		/** 是否显示去底部按钮 */
		disableToBottom: {
			type: Boolean,
			default: false,
		},
		/** 滚动容器 */
		target: {
			type: Object as PropType<TYPES.IBackTarget>,
			default: window,
			validator(v: any) {
				return v instanceof Window || v instanceof HTMLElement;
			},
		},
	},
	setup(props: TYPES.IBackProps, context) {
		const state = reactive({
			showTop: false,
			showBottom: false,
		});
		const app = ref(getCurrentInstance()).value;

		const computedIsGlobal = computed(() => {
			return props.target instanceof Window;
		});
		const _scrollHelper = UTILS.throttle(handleScroll, {
			timestamp: 0,
		});

		onMounted(() => {
			setTimeout(() => {
				handleScroll();
				props.target.addEventListener('scroll', _scrollHelper);
			}, 0);
		});
		onBeforeUnmount(() => {
			props.target.removeEventListener('scroll', _scrollHelper);
		});

		function handleScroll() {
			let scrollTop = 0;
			let scrollHeight = 0;
			let offsetHeight = 0;
			if (computedIsGlobal.value) {
				scrollTop =
					document.body.scrollTop || document.documentElement.scrollTop;
				scrollHeight =
					document.body.scrollHeight || document.documentElement.scrollHeight;
				offsetHeight =
					document.body.offsetHeight || document.documentElement.offsetHeight;
			} else {
				scrollTop = (props.target as HTMLElement).scrollTop;
				scrollHeight = (props.target as HTMLElement).scrollHeight;
				offsetHeight = (props.target as HTMLElement).offsetHeight;
			}

			state.showTop = scrollTop > props.distance;
			state.showBottom = scrollHeight - scrollTop !== offsetHeight;
		}
		function toTop() {}
		function toBottom() {}

		return {
			props,
			state,
			context,
			app,
			VARIABLE,
			computedIsGlobal,
			toTop,
			toBottom,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Back.scss';
</style>
