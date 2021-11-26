<template>
	<div class="v3-progress-linear">线性进度条</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/progress';
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	PropType,
	reactive,
	ref,
} from 'vue';
import * as UTILS from '@common/utils/index';

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
			default: 'primary',
			validator(v: string) {
				return ['primary', 'success', 'danger', 'warning'].includes(v);
			},
		},
		/** 进度条线条的宽度 */
		trackWidth: {
			type: String,
			default: '4px',
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
		/** 进度条的宽度 */
		width: {
			type: String,
			default: '200px',
		},
		/** 是否开启进度条的阴影动画 */
		animation: {
			type: Boolean,
			default: true,
		},
	},
	setup(props: TYPES.IProgressLinearProps, context) {
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
@import './ProgressLinear.scss';
</style>
