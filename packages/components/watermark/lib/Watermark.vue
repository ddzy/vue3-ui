<template>
	<div :class="['v3-watermark', props.fullscreen && 'is-fullscreen']">
		<slot></slot>
		<div
			class="v3-watermark__inner"
			:style="{
				backgroundImage: `url(${watermark})`,
				zIndex: props.zIndex,
			}"
		></div>
	</div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { multiply } from '@common/utils';
import { isPlainObject, isString } from 'lodash-es';
import { isNumber } from 'mathjs';

import { IWatermarkFont, IWatermarkProps } from '@/public/typings';

defineOptions({
	name: 'V3Watermark',
});

const props = withDefaults(defineProps<IWatermarkProps>(), {
	/**
	 * 水印的宽度，文本超出该宽度会换行显示
	 */
	width: 120,
	/**
	 * 水印的高度（当水印为图片时有效）
	 */
	height: 64,
	/**
	 * 文本行高
	 */
	lineHeight: 1.5,
	/**
	 * 水印旋转的角度
	 */
	rotate: -30,
	zIndex: 10,
	/**
	 * 指定水印为图片
	 */
	image: undefined,
	/**
	 * 文本配置
	 */
	font: undefined,
	/**
	 * 水印之间的间距
	 */
	gap: undefined,
	/**
	 * 水印距离边界的初始偏移量
	 */
	offset: undefined,
	/**
	 * 是否全屏显示
	 */
	fullscreen: false,
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
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		return;
	}
	const matrix = ctx.measureText(props.content as string);
	const height = multiply(props.lineHeight, computedFont.value.fontSize!);

	// 将宽度和高度设置为四个水印的大小
	canvas.width =
		computedOffset.value.x + (props.width + computedGap.value.x) * 2;
	canvas.height = computedOffset.value.y + (height + computedGap.value.y) * 4;
	ctx.textAlign = computedFont.value.textAlign!;
	ctx.textBaseline = computedFont.value.textBaseline!;
	ctx.font = `${computedFont.value.fontStyle} ${computedFont.value.fontWeight} ${computedFont.value.fontSize}px ${computedFont.value.fontFamily}`;
	ctx.fillStyle = computedFont.value.color!;

	function _fillText() {
		if (!ctx) {
			return;
		}
		if (isString(props.content)) {
			// 起始位置（水平方向）
			let startXOfLine = 0;
			// 起始位置（竖直方向）
			let startYOfLine = 0;
			let chars = props.content.split('');
			chars.forEach((v) => {
				// 逐个字符宽度相加
				let nextWidth = startXOfLine + ctx.measureText(v).width;
				// 如果字符宽度大于水印的最大宽度，表明需要换行
				if (nextWidth > props.width) {
					startYOfLine += height;
					startXOfLine = 0;
				} else {
					startXOfLine = nextWidth;
				}
				// 绘制文本
				ctx.fillText(v, startXOfLine, startYOfLine);
			});
		}
	}

	// 绘制四个默认的水印，然后让图片平铺
	ctx.save();
	ctx.translate(
		computedOffset.value.x + props.width / 2,
		computedOffset.value.y + height / 2,
	);
	ctx.rotate((330 * Math.PI) / 180);
	ctx.translate(-(props.width / 2), -(height / 2));
	_fillText();
	ctx.restore();

	ctx.save();
	ctx.translate(
		computedOffset.value.x +
			props.width / 2 +
			(props.width + computedGap.value.x) * 1,
		computedOffset.value.y + height / 2 + (height + computedGap.value.y) * 1,
	);
	ctx.rotate((330 * Math.PI) / 180);
	ctx.translate(-props.width / 2, -height / 2);
	_fillText();
	ctx.restore();

	ctx.save();
	ctx.translate(
		computedOffset.value.x + props.width / 2,
		computedOffset.value.y + height / 2 + (height + computedGap.value.y) * 2,
	);
	ctx.rotate((330 * Math.PI) / 180);
	ctx.translate(-props.width / 2, -height / 2);
	_fillText();
	ctx.restore();

	ctx.save();
	ctx.translate(
		computedOffset.value.x +
			props.width / 2 +
			(props.width + computedGap.value.x) * 1,
		computedOffset.value.y + height / 2 + (height + computedGap.value.y) * 3,
	);
	ctx.rotate((330 * Math.PI) / 180);
	ctx.translate(-props.width / 2, -height / 2);
	_fillText();
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
