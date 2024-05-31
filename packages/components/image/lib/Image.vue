<template>
	<div
		class="v3-image"
		ref="containerRef"
		:class="{
			'is-rounded': props.rounded,
			'is-lazy': props.lazy,
			'is-failed': isFailed,
			'has-toolbar': props.showToolbar,
			'has-animation': props.animated,
			'has-loading': props.showLoading,
		}"
		:style="{
			width: computedSize.width,
			height: computedSize.height,
			'--border-radius': computedRadius,
			'--font-size': computedFontSize,
			'--loading-font-size': computedLoadingFontSize,
		}"
	>
		<Transition
			v-if="canRender"
			:name="props.animated ? 'v3-image-fade' : ''"
			mode="out-in"
		>
			<template v-if="!isLoading">
				<img
					v-if="!isFailed"
					class="v3-image__inner"
					:src="props.src"
					:[`data-preview-src`]="props.previewSrc || src"
					:width="computedSize.width"
					:height="computedSize.height"
					:loading="
						props.lazy && !props.lazyOptions?.useIntersectionObserver
							? 'lazy'
							: 'eager'
					"
					:style="{
						objectFit: props.objectFit,
					}"
					alt=""
				/>
				<!-- 图片加载失败的slot -->
				<template v-else>
					<slot v-if="!!slots.failed" name="failed"></slot>
					<div v-else class="v3-image__failed">
						<V3Icon type="Pic" />
					</div>
				</template>
			</template>
			<template v-else-if="props.showLoading && isLoading">
				<!-- 图片加载中的slot -->
				<slot v-if="!!slots.loading" name="loading"></slot>
				<div v-else class="v3-image__loading">
					<V3Icon type="LoadingOne" spin />
				</div>
			</template>
		</Transition>
	</div>
</template>
<script lang="ts" setup>
import { Ref, computed, onMounted, reactive, ref, useSlots, watch } from 'vue';
import Decimal from 'decimal.js';
import type { IImageProps } from '@typings/index';
import { useImage, useIntersectionObserver } from '@common/hooks/index';
import V3Icon from '@components/icon/main';

defineOptions({
	name: 'V3Image',
});

const props = withDefaults(defineProps<IImageProps>(), {
	/** 预览的图片URL，未提供则使用 src */
	previewSrc: '',
	/** 是否禁用预览 */
	previewDisabled: false,
	/** 图片原生width属性，指定width/height可以让浏览器预留位置加载图片，避免布局发生大的变化 */
	width: 0,
	/** 图片原生height属性 */
	height: 0,
	/** 是否开启懒加载 */
	lazy: false,
	/** 是否开启动画效果 */
	animated: true,
	/** 懒加载参数 */
	lazyOptions: () => ({
		/** 是否使用 IntersectionObserver API 代替原生 loading 属性 */
		useIntersectionObserver: true,
		intersectionRoot: null,
		intersectionRootMargin: '0px 0px 0px 0px',
		intersectionThreshold: 0,
	}),
	/** 同 css object-fit 属性 */
	objectFit: 'fill',
	/** 是否显示预览的工具栏 */
	showToolbar: true,
	/** 是否开启 loading 效果 */
	showLoading: false,
	/** 是否圆形（显示为头像） */
	rounded: false,
	/** 圆角大小(50%时的效果等同于`rounded`)，当`rounded`为`true`时，忽略本参数 */
	radius: 0,
});
const slots = useSlots();
const containerRef = ref(null);
const extractNumReg = /^\d+/g;

const computedSize = computed(() => {
	const width = props.width
		? typeof props.width === 'string'
			? props.width
			: typeof props.width === 'number'
			? `${props.width}px`
			: ''
		: '';
	const height = props.height
		? typeof props.height === 'string'
			? props.height
			: typeof props.height === 'number'
			? `${props.height}px`
			: ''
		: '';

	return {
		width,
		height,
	};
});
const computedRadius = computed(() => {
	const reg = /^\d+$/;
	let radius = `${props.rounded ? '50%' : props.radius}`;
	// 加上"px"单位
	if (reg.test(radius)) {
		radius = `${radius}px`;
	}

	return radius;
});
const computedFontSize = computed(() => {
	// 根据图片大小，计算合适的文字大小
	// 以 100x100 => font-size: 30px 为基准
	let matchedWidth = computedSize.value.width.match(extractNumReg);
	let width = matchedWidth ? matchedWidth[0] : 0;
	let matchedHeight = computedSize.value.height.match(extractNumReg);
	let height = matchedHeight ? matchedHeight[0] : 0;

	// 基准值取宽高中的最小值
	let base = Decimal.min(width, height);
	let fontSize = base.mul(30).div(100);

	return `${fontSize}px`;
});
const computedLoadingFontSize = computed(() => {
	// 根据图片大小，计算合适的loading大小
	// 以 100x100 => font-size: 20px 为基准
	let matchedWidth = computedSize.value.width.match(extractNumReg);
	let width = matchedWidth ? matchedWidth[0] : 0;
	let matchedHeight = computedSize.value.height.match(extractNumReg);
	let height = matchedHeight ? matchedHeight[0] : 0;

	// 基准值取宽高中的最小值
	let base = Decimal.min(width, height);
	let fontSize = base.mul(20).div(100);

	return `${fontSize}px`;
});

// 懒加载需要延迟渲染
let canRender = ref(false);
let isLoading = ref(false);
let isFailed = ref(false);
let prevStop = () => {};

watch(
	() => props.src,
	() => {
		const _next = () => {
			const { isLoading: _isLoading, isFailed: _isFailed } = useImage({
				src: props.src,
			});
			isLoading = _isLoading;
			isFailed = _isFailed;
		};

		if (props.lazy && props.lazyOptions.useIntersectionObserver) {
			// 如果开启了懒加载
			onMounted(() => {
				const target = containerRef.value;
				if (target) {
					// 每次 src 变化，取消上次监听的元素，防止重复监听
					prevStop();
					const { stop } = useIntersectionObserver(
						target,
						([{ isIntersecting }]) => {
							if (isIntersecting) {
								// 等到图片出现在可视区域时再渲染子元素，同时避免重复渲染
								if (!canRender.value) {
									canRender.value = true;
									_next();
								}
							}
						},
					);
					prevStop = stop;
				}
			});
		} else {
			// 非懒加载，直接渲染子元素
			canRender.value = true;
			_next();
		}
	},
	{ immediate: true },
);
</script>
<style lang="scss">
@import './Image.scss';
</style>
