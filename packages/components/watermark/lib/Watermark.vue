<template>
	<div
		:class="['v3-watermark', props.fullscreen && 'is-fullscreen']"
		ref="wrapperRef"
	>
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
import { computed, ref, watch } from 'vue';

import { multiply } from '@common/utils';
import { useElementBounding } from '@vueuse/core';
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
		fontFamily: `Courier New,
		Inter,
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
		x: 0,
		y: 0,
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

const wrapperRef = ref<HTMLElement>();

const watermark = ref();
function updateWatermark() {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		return;
	}
	// 将宽度和高度设置为四个水印的大小
	const wrapperBounding = useElementBounding(wrapperRef);
	if (!props.fullscreen) {
		canvas.width = wrapperBounding.width.value;
		canvas.height = wrapperBounding.height.value;
	} else {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	ctx.textAlign = computedFont.value.textAlign!;
	ctx.textBaseline = computedFont.value.textBaseline!;
	ctx.font = `${computedFont.value.fontStyle} ${computedFont.value.fontWeight} ${computedFont.value.fontSize}px ${computedFont.value.fontFamily}`;
	ctx.fillStyle = computedFont.value.color!;

	// 每个水印的总宽度
	const eachWidth = props.width;
	// 水印每行文本的高度
	const eachRowHeight = multiply(
		props.lineHeight,
		computedFont.value.fontSize!,
	);
	// 每个水印文本的总高度
	const eachHeight = computeEachWatermark()! * eachRowHeight;
	function computeEachWatermark(fillText?: boolean) {
		if (!ctx) {
			return;
		}
		// 每个水印文本有多少行
		let eachRowCount = 0;
		// 每个水印文本绘制的x轴起始位置
		let eachStartX = 0;
		// 每个水印文本绘制的y轴起始位置
		let eachStartY = 0;
		computedContent.value.forEach((v, i) => {
			let chars = v.split('');
			chars.forEach((v, i) => {
				// 逐个字符宽度相加
				let nextWidth = eachStartX + ctx.measureText(v).width;
				// 如果字符宽度大于水印的最大宽度，表明需要换行
				if (nextWidth > eachWidth) {
					eachStartY += eachRowHeight;
					eachStartX = 0;
					eachRowCount += 1;
				} else {
					eachStartX = i === 0 ? 0 : nextWidth;
				}
				// 绘制文本
				fillText && ctx.fillText(v, eachStartX, eachStartY);
			});
			// 数组中的每一项都另起一行
			eachStartY += eachRowHeight;
			eachStartX = 0;
			eachRowCount += 1;
		});

		return eachRowCount;
	}
	// 根据canvas的宽高和每个水印的宽高，计算出需要绘制多少行、多少列
	// 保险起见，绘制两倍的水印
	let columnCount = Math.ceil(canvas.width / eachWidth) * 2;
	let rowCount = Math.ceil(canvas.height / eachHeight) * 2;
	// 每行水印的起始位置
	let startY = 0;
	for (let i = 0; i < rowCount; i++) {
		startY = (eachRowHeight + computedGap.value.y) * i;
		// 每行中每个水印的起始位置
		let startX = 0;
		for (let j = 0; j < columnCount; j++) {
			startX = (eachWidth + computedGap.value.x) * j;
			ctx.save();
			ctx.translate(
				computedOffset.value.x + eachWidth / 2 + startX,
				computedOffset.value.y + eachRowHeight / 2 + startY,
			);
			// 错位绘制
			if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
				ctx.rotate(((360 + props.rotate) * Math.PI) / 180);
				ctx.translate(-(eachWidth / 2), -(eachRowHeight / 2));
				computeEachWatermark(true);
			}
			ctx.restore();
		}
	}

	// 将canvas保存为图片
	watermark.value = canvas.toDataURL();
}
watch(
	() => props,
	() => {
		setTimeout(() => {
			updateWatermark();
		}, 0);
	},
	{ deep: true, immediate: true },
);
</script>
<style lang="scss">
@import './Watermark.scss';
</style>
