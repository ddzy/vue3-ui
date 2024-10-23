<template>
	<div
		class="v3-watermark"
		:style="{
			backgroundImage: `url(${watermark})`,
		}"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { isPlainObject, isString } from 'lodash-es';
import { isNumber } from 'mathjs';

import { IWatermarkFont, IWatermarkProps } from '@/public/typings';

defineOptions({
	name: 'V3Watermark',
});

const props = withDefaults(defineProps<IWatermarkProps>(), {
	width: 120,
	height: 64,
	/**
	 * 旋转的角度
	 */
	rotate: -30,
	zIndex: 10,
	image: undefined,
	font: undefined,
	gap: undefined,
	offset: undefined,
});

const computedContent = computed(() => {
	return isString(props.content) ? [props.content] : props.content;
});
const computedFont = computed(() => {
	const defaultFont: IWatermarkFont = {
		color: 'rgba(233, 233, 233, 1)',
		fontFamily: `Inter,
		-apple-system,
		BlinkMacSystemFont,
		'PingFang SC',
		'Hiragino Sans GB',
		'noto sans',
		'Microsoft YaHei',
		'Helvetica Neue',
		Helvetica,
		Arial,
		sans-serif`,
		fontSize: 16,
		fontWeight: 400,
		fontStyle: 'normal',
		textAlign: 'left',
		textBaseline: 'top',
		...(props.font || {}),
	};
	return defaultFont;
});
const computedGap = computed(() => {
	let defaultGap = {
		x: 50,
		y: 50,
	};
	let result = isNumber(props.gap)
		? {
				x: props.gap,
				y: props.gap,
			}
		: isPlainObject(props.gap)
			? {
					...defaultGap,
					...props.gap,
				}
			: {
					...defaultGap,
				};
	return result;
});
const computedOffset = computed(() => {
	let defaultOffset = {
		x: 10,
		y: 10,
	};
	let result = isNumber(props.offset)
		? {
				x: props.offset,
				y: props.offset,
			}
		: isPlainObject(props.offset)
			? {
					...defaultOffset,
					...props.offset,
				}
			: {
					...defaultOffset,
				};
	return result;
});

const watermark = ref();
function updateWatermark() {
	const canvas = document.createElement('canvas');
	// 将宽度和高度设置为四个水印的大小
	canvas.width =
		computedOffset.value.x + (props.width + computedGap.value.x) * 2;
	canvas.height =
		computedOffset.value.y + (props.height + computedGap.value.y) * 4;
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		return;
	}
	ctx.textAlign = computedFont.value.textAlign!;
	ctx.textBaseline = computedFont.value.textBaseline!;
	ctx.font = `${computedFont.value.fontStyle} ${computedFont.value.fontWeight} ${computedFont.value.fontSize}px ${computedFont.value.fontFamily}`;
	ctx.fillStyle = computedFont.value.color!;

	// 绘制四个默认的水印，然后让图片平铺
	ctx.save();
	ctx.translate(
		computedOffset.value.x + props.width / 2,
		computedOffset.value.y + props.height / 2,
	);
	ctx.rotate((330 * Math.PI) / 180);
	ctx.translate(-(props.width / 2), -(props.height / 2));
	ctx.fillText(props.content as string, 0, 0);
	ctx.restore();

	ctx.save();
	ctx.translate(
		computedOffset.value.x +
			props.width / 2 +
			(props.width + computedGap.value.x) * 1,
		computedOffset.value.y +
			props.height / 2 +
			(props.height + computedGap.value.y) * 1,
	);
	ctx.rotate((330 * Math.PI) / 180);
	ctx.translate(-props.width / 2, -props.height / 2);
	ctx.fillText(props.content as string, 0, 0);
	ctx.restore();

	ctx.save();
	ctx.translate(
		computedOffset.value.x + props.width / 2,
		computedOffset.value.y +
			props.height / 2 +
			(props.height + computedGap.value.y) * 2,
	);
	ctx.rotate((330 * Math.PI) / 180);
	ctx.translate(-props.width / 2, -props.height / 2);
	ctx.fillText(props.content as string, 0, 0);
	ctx.restore();

	ctx.save();
	ctx.translate(
		computedOffset.value.x +
			props.width / 2 +
			(props.width + computedGap.value.x) * 1,
		computedOffset.value.y +
			props.height / 2 +
			(props.height + computedGap.value.y) * 3,
	);
	ctx.rotate((330 * Math.PI) / 180);
	ctx.translate(-props.width / 2, -props.height / 2);
	ctx.fillText(props.content as string, 0, 0);
	ctx.restore();

	// 将canvas保存为图片
	watermark.value = canvas.toDataURL();
}
onMounted(() => {
	updateWatermark();
});
</script>
<style lang="scss">
@import './Watermark.scss';
</style>
