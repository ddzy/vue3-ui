<template>
	<div
		class="v3-image"
		:class="{
			'is-rounded': props.rounded,
			'is-lazy': props.lazy,
			'is-failed': isFailed,
			'has-toolbar': props.showToolbar,
		}"
		:style="{
			width: computedSize.width,
			height: computedSize.height,
		}"
	>
		<Transition :name="props.animated ? 'v3-image-fade' : ''" mode="out-in">
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
import { Ref, computed, reactive, ref, useSlots, watch } from 'vue';
import type { IImageProps } from '@typings/index';
import { useImage } from '@common/hooks/index';
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
	lazy: true,
	/** 是否开启动画效果 */
	animated: true,
	/** 懒加载参数 */
	lazyOptions: () => ({
		/** 是否使用 IntersectionObserver API 代替原生 loading 属性 */
		useIntersectionObserver: false,
	}),
	/** 同 css object-fit 属性 */
	objectFit: 'fill',
	/** 是否显示预览的工具栏 */
	showToolbar: true,
	/** 是否开启 loading 效果 */
	showLoading: false,
	/** 是否圆形（显示为头像） */
	rounded: false,
});
const slots = useSlots();
const state = reactive({});

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

let { isLoading, isFailed } = useImage({ src: props.src });

watch(
	() => props.src,
	() => {
		const { isLoading: _isLoading, isFailed: _isFailed } = useImage({
			src: props.src,
		});
		isLoading = _isLoading;
		isFailed = _isFailed;
	},
);
</script>
<style lang="scss">
@import './Image.scss';
</style>
