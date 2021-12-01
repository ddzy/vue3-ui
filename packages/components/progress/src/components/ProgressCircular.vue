<template>
	<div
		class="v3-progress-circular"
		:style="{
			'--progress-radius': props.radius,
			'--progress-track-width': props.trackWidth,
			'--progress-track-color': props.trackColor,
			'--progress-done-track-color': props.doneTrackColor,
		}"
	>
		<div class="v3-progress__label">
			<span>{{ computedLabel }}</span>
		</div>
		<div class="v3-progress__section v3-progress__left">
			<div class="v3-progress-section__inner v3-progress-left__inner"></div>
		</div>
		<div class="v3-progress__section v3-progress__right">
			<div class="v3-progress-section__inner v3-progress-right__inner"></div>
		</div>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/progress';
import { computed, defineComponent, PropType, reactive } from 'vue';

interface IState {}

export default defineComponent({
	name: 'V3ProgressCircular',
	components: {},
	props: {
		/** 已完成的进度（百分比） */
		percent: {
			type: Number,
			required: true,
		},
		/** 进度环的主题（内置四种主题） */
		theme: {
			type: String as PropType<TYPES.IProgressTheme>,
			default: 'custom',
			validator(v: string) {
				return ['custom', 'primary', 'success', 'danger', 'warning'].includes(
					v
				);
			},
		},
		/** 进度环线条的宽度 */
		trackWidth: {
			type: String,
			default: '6px',
		},
		/** 轨道的背景色 */
		trackColor: {
			type: String,
			default: 'rgba(221, 221, 221, 1)',
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
		/** 进度环半径 */
		radius: {
			type: String,
			default: '50px',
		},
	},
	setup(props: TYPES.IProgressCircularProps, context) {
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
@import './ProgressCircular.scss';
</style>
