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
			v-if="!props.disableToTop && showTop"
			class="v3-back__top"
			@click="toTop"
		>
			<v3-button
				v-if="!slots.top"
				circle
				type="primary"
				icon="ToTop"
			></v3-button>
			<slot v-else name="top"></slot>
		</div>

		<div
			v-if="!props.disableToBottom && showBottom"
			class="v3-back__bottom"
			@click="toBottom"
		>
			<v3-button
				v-if="!slots.bottom"
				circle
				type="primary"
				icon="ToBottom"
			></v3-button>
			<slot v-else name="bottom"></slot>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue';

import * as UTILS from '@common/utils/index';
import VARIABLE from '@common/constants/internal-variable';
import V3Button from '@components/button/main';
import useEventListener from '@hooks/useEventListener';
import useThrottle from '@hooks/useThrottle';
import { IBackProps } from '@typings/index';

defineOptions({
	name: 'V3Back',
});
const props = withDefaults(defineProps<IBackProps>(), {
	/** 页面滚动距离超过该值时显示去顶部按钮 */
	distance: 400,
	/** 是否禁用（即不显示）“去顶部”按钮 */
	disableToTop: false,
	/** 是否禁用（即不显示）“去底部”按钮 */
	disableToBottom: false,
	/** 滚动容器 */
	// @ts-ignore
	target: window,
});
const slots = useSlots();

const computedIsGlobal = computed(() => {
	return props.target instanceof Window;
});
const computedTarget = computed(() => {
	return computedIsGlobal.value
		? document.body || document.documentElement
		: (props.target as HTMLElement);
});

const showTop = ref(false);
const showBottom = ref(false);
const scrollHandler = useThrottle(handleScroll);
function handleScroll() {
	const values = getValue();
	if (!values) {
		return;
	}
	const { scrollTop, scrollHeight, offsetHeight } = values;
	showTop.value = scrollTop > props.distance;
	showBottom.value = scrollHeight - scrollTop !== offsetHeight;
}
useEventListener(() => props.target, 'scroll', scrollHandler);

function getValue() {
	if (!computedTarget.value) {
		return;
	}
	let scrollTop = computedTarget.value.scrollTop;
	let scrollHeight = computedTarget.value.scrollHeight;
	let offsetHeight = computedTarget.value.offsetHeight;
	let clientHeight = computedTarget.value.clientHeight;

	return {
		scrollTop,
		scrollHeight,
		offsetHeight,
		clientHeight,
	};
}

const timer = ref();
function toTopHelper() {
	const values = getValue();
	if (!values) {
		return;
	}
	const { scrollTop: currentScrollTop } = values;

	// 已到达顶部
	if (currentScrollTop <= 0) {
		window.cancelAnimationFrame(timer.value);
		computedTarget.value.scrollTop = 0;
		timer.value = 0;
		return;
	}

	UTILS.ease(currentScrollTop, 0, 8, (nextScrollTop) => {
		computedTarget.value.scrollTop = nextScrollTop;
		timer.value = window.requestAnimationFrame(toTopHelper);
	});
}
function toTop() {
	if (timer.value) {
		return;
	}
	timer.value = window.requestAnimationFrame(toTopHelper);
}

function toBottomHelper() {
	const values = getValue();
	if (!values) {
		return;
	}
	const { scrollTop: currentScrollTop, offsetHeight, scrollHeight } = values;
	const targetM = scrollHeight - offsetHeight;

	// 已到达底部
	if (currentScrollTop >= targetM) {
		window.cancelAnimationFrame(timer.value);
		computedTarget.value.scrollTop = targetM;
		timer.value = 0;
		return;
	}

	UTILS.ease(currentScrollTop, targetM, 8, (nextScrollTop) => {
		computedTarget.value.scrollTop = nextScrollTop;
		timer.value = window.requestAnimationFrame(toBottomHelper);
	});
}
function toBottom() {
	if (timer.value) {
		return;
	}
	timer.value = window.requestAnimationFrame(toBottomHelper);
}
</script>
<style lang="scss">
@import './Back.scss';
</style>
