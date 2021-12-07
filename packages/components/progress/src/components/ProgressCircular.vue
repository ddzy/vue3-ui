<template>
	<div
		class="v3-progress-circular"
		:class="{
			[`is-theme-${props.theme}`]: true,
		}"
		:style="{
			'--progress-width': `${(props.trackWidth + props.radius) * 2}px`,
			'--progress-track-color': props.trackColor,
			'--progress-done-track-color': props.doneTrackColor,
		}"
	>
		<svg class="v3-progress__paper">
			<g :stroke-width="`${props.trackWidth}px`">
				<!-- 背景圆 -->
				<circle
					class="v3-progress__circle v3-progress-circle__track"
					fill="none"
					:cx="props.radius + props.trackWidth"
					:cy="props.radius + props.trackWidth"
					:r="props.radius"
				></circle>
				<!-- 圆环 -->
				<circle
					class="v3-progress__circle v3-progress-circle__done"
					fill="none"
					:cx="props.radius + props.trackWidth"
					:cy="props.radius + props.trackWidth"
					:r="props.radius"
					:stroke-dasharray="state.strokeDashArray"
					:transform="
						`rotate(${props.rotate}, ${props.radius +
							props.trackWidth}, ${props.radius + props.trackWidth})`
					"
				></circle>
			</g>
			<text
				v-if="props.showLabel"
				fill="#666"
				font-size="16"
				text-anchor="middle"
				dominant-baseline="middle"
				:x="props.radius + props.trackWidth"
				:y="props.radius + props.trackWidth"
			>
				<tspan>{{ computedLabel }}</tspan>
			</text>
		</svg>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/progress';
import { computed, defineComponent, PropType, reactive, watch } from 'vue';
import Decimal from 'decimal.js';

interface IState {
	strokeDashArray: string;
}

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
			type: Number,
			default: 6,
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
			type: Number,
			default: 50,
		},
		/** 进度环摆放的角度 */
		rotate: {
			type: Number,
			default: -90,
		},
	},
	setup(props: TYPES.IProgressCircularProps, context) {
		const state: IState = reactive({
			strokeDashArray: '',
		});

		const computedLabel = computed(() => {
			return props.formatLabel && typeof props.formatLabel === 'function'
				? props.formatLabel(props.percent)
				: `${props.percent}%`;
		});

		watch(
			() => props.percent,
			() => {
				// 圆的周长（线段总长度）
				const perimeter = new Decimal(props.radius).mul(Math.PI).mul(2);
				const percentToFloat = new Decimal(props.percent).div(100);

				state.strokeDashArray = `${perimeter
					.mul(percentToFloat)
					.toNumber()}, ${perimeter.toNumber()}`;
			},
			{ immediate: true }
		);

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
