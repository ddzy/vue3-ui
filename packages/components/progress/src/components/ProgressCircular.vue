<template>
	<div class="v3-progress-circular">圆形进度条</div>
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

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './ProgressCircular.scss';
</style>
