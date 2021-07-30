<template>
	<div class="v3-slider">
		<div class="v3-slider__prepend">
			<!-- 优先级：slot="prepend" > prependIcon > label -->
			<slot name="prepend" v-if="context.slots.prepend"></slot>
			<i
				:class="{
					'v3-icon': true,
					[`${props.prependIcon}`]: true,
				}"
				v-else-if="!context.slots.prepend && props.prependIcon"
			></i>
			<label
				v-else-if="!context.slots.prepend && !props.prependIcon && props.label"
			>
				{{ props.label }}
			</label>
		</div>
		<div class="v3-slider__track">
			<div class="v3-slider-track__inner">
				<div class="v3-slider-track__done"></div>
				<div class="v3-slider-track__thumb"></div>
				<div class="v3-slider-track__mark"></div>
				<div class="v3-slider-track__label"></div>
			</div>
		</div>
		<div class="v3-slider__append">
			<!-- 优先级：slot="append" > appendIcon > label -->
			<slot name="append" v-if="context.slots.append"></slot>
			<i
				:class="{
					'v3-icon': true,
					[`${props.appendIcon}`]: true,
				}"
				v-else-if="!context.slots.append && props.appendIcon"
			></i>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import * as TYPES from '@/public/types/slider';

interface IState {}

export default defineComponent({
	name: 'V3Slider',
	props: {
		/** 滑块的值 */
		modelValue: {
			type: [Number, Array] as PropType<TYPES.ISliderModelValue>,
			required: true,
		},
		/** 滑块最大值 */
		max: {
			type: Number,
			default: 100,
		},
		/** 滑块最小值 */
		min: {
			type: Number,
			default: 0,
		},
		/** 是否禁用滑块 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 步数 */
		step: {
			type: Number,
			default: 1,
		},
		/** 是否显示间断点 */
		showMark: {
			type: Boolean,
			default: false,
		},
		/** 是否显示气泡框 */
		showTooltip: {
			type: Boolean,
			default: true,
		},
		/** 是否一直显示气泡框 */
		showTooltipAlways: {
			type: Boolean,
			default: false,
		},
		/** 格式化 tooltip 显示的值 */
		formatTooltip: {
			type: Function as PropType<TYPES.ISliderFormatTooltip>,
			default: null,
		},
		/** 是否为范围滑块 */
		range: {
			type: Boolean,
			default: false,
		},
		/** 是否为垂直方向 */
		vertical: {
			type: Boolean,
			default: false,
		},
		/** 滑块为垂直方向时的高度 */
		height: {
			type: String,
			default: '0px',
		},
		/** 滑块的 label */
		label: {
			type: String,
			default: '',
		},
		/** 前置图标 */
		prependIcon: {
			type: String,
			default: '',
		},
		/** 后置图标 */
		appendIcon: {
			type: String,
			default: '',
		},
		/** 自定义 tooltip 的类名 */
		customTooltipClass: {
			type: String,
			default: '',
		},
		/** 间断点列表 */
		marks: {
			type: Array as PropType<TYPES.ISliderMarkItem[]>,
			default: null,
		},
	},
	setup(props: TYPES.ISliderProps, context) {
		const state: IState = reactive({});

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Slider.scss';
</style>
