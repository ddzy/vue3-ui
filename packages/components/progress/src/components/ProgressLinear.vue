<template>
	<div
		class="v3-progress-linear"
		:class="{
			'has-round': props.round,
			'has-animation': props.animation,
			[`is-theme-${props.theme}`]: props.theme,
		}"
		:style="{
			'--progress-width': props.width,
			'--progress-track-width': props.trackWidth,
			'--progress-track-color': props.trackColor,
			'--progress-done-track-color': props.doneTrackColor,
			'--progress-track-round': props.roundLength,
		}"
	>
		<div class="v3-progress__track">
			<div class="v3-progress-track__inner">
				<div
					class="v3-progress-track__done"
					:style="{
						width: `${props.percent}%`,
					}"
				></div>
				<div class="v3-progress-track__stop"></div>
			</div>
		</div>
		<div v-if="props.showLabel" class="v3-progress__append">
			<span>{{ computedLabel }}</span>
		</div>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/progress';
import { computed, defineComponent, PropType, reactive } from 'vue';

interface IState {}

export default defineComponent({
	name: 'V3ProgressLinear',
	components: {},
	props: {
		/** 已完成的进度（百分比） */
		percent: {
			type: Number,
			required: true,
		},
		/** 进度条的主题（内置四种主题） */
		theme: {
			type: String as PropType<TYPES.IProgressTheme>,
			default: 'custom',
			validator(v: string) {
				return ['custom', 'primary', 'success', 'danger', 'warning'].includes(
					v
				);
			},
		},
		/** 进度条线条的宽度 */
		trackWidth: {
			type: String,
			default: '6px',
		},
		/** 轨道的背景色 */
		trackColor: {
			type: String,
			default: '#e5e6eb',
		},
		/** 已完成进度的背景色 */
		doneTrackColor: {
			type: String,
			default: 'rgba(0, 160, 255, 1)',
		},
		/** 是否显示 label */
		showLabel: {
			type: Boolean,
			default: true,
		},
		/** 自定义 label 的显示文本 */
		formatLabel: {
			type: Function as PropType<TYPES.IProgressFormatLabel>,
			default: null,
		},
		/** 进度条的宽度 */
		width: {
			type: String,
			default: '100%',
		},
		/** 是否开启进度条的阴影动画 */
		animation: {
			type: Boolean,
			default: true,
		},
		/** 是否开启圆角 */
		round: {
			type: Boolean,
			default: true,
		},
		/** 圆角大小 */
		roundLength: {
			type: String,
			default: '100px',
		},
	},
	setup(props: TYPES.IProgressLinearProps, context) {
		const state: IState = reactive({});

		const computedLabel = computed(() => {
			return props.formatLabel && typeof props.formatLabel === 'function'
				? props.formatLabel(props.percent)
				: `${props.percent}%`;
		});

		return {
			state,
			props,
			context,
			computedLabel,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './ProgressLinear.scss';
</style>
