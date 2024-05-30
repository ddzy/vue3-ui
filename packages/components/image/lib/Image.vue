<template>
	<div class="v3-image">
		<img :src="props.src" alt="" />
	</div>
</template>
<script lang="ts" setup>
import type { IImageProps } from '@typings/index';

defineOptions({
	name: 'V3Image',
});
const props = withDefaults(defineProps<IImageProps>(), {
	// 预览的图片URL，未提供则使用 src
	previewSrc: '',
	// 是否禁用预览
	previewDisabled: false,
	// 图片加载失败时的显示图像
	fallbackSrc: '',
	width: 0,
	height: 0,
	// 是否开启懒加载
	lazy: true,
	// 同 css object-fit 属性
	objectFit: 'fill',
	// 是否显示预览的工具栏
	showToolbar: true,
	// 是否圆形（显示为头像）
	rounded: false,
});
</script>
<style lang="scss">
@import './Image.scss';
</style>
