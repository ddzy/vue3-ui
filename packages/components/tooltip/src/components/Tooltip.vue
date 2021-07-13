<template>
	<div class="v3-tooltip">tooltip</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
} from 'vue';
import * as TYPES from '@/public/types/tooltip';

export default defineComponent({
	name: 'V3Tooltip',
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
		/** 主题色（黑/白） */
		theme: {
			type: String as PropType<TYPES.ITooltipTheme>,
			default: 'dark',
			validator(v: string) {
				return ['dark', 'light'].includes(v);
			},
		},
		/** tooltip 内容，也可以通过默认 slot 传入 */
		content: {
			type: String,
			default: '',
		},
		/** 弹出位置 */
		placement: {
			type: String as PropType<TYPES.ITooltipPlacement>,
			default: 'auto',
			validator(v: string) {
				return [
					'top',
					'top-start',
					'top-end',
					'right',
					'right-start',
					'right-end',
					'bottom',
					'bottom-start',
					'bottom-end',
					'left',
					'left-start',
					'left-end',
					'auto',
					'auto-start',
					'auto-end',
				].includes(v);
			},
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 距离触发器的距离 */
		offset: {
			type: Object as PropType<TYPES.ITooltipOffset>,
			default: [0, 5],
		},
		/** 自定义弹出的动画 */
		animation: {
			type: String,
			default: 'v3-tooltip-slide-fade',
		},
		/** 显示/隐藏的延迟 */
		delay: {
			type: Object as PropType<TYPES.ITooltipDelay>,
			default: [0, 0],
		},
		/** 触发的方式 */
		trigger: {
			type: String,
			default: 'hover',
		},
	},
	setup(props: TYPES.ITooltipProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			state,
			app,
			props,
			context,
		};
	},
});
</script>
<style lang="scss">
@import '@common/styles/global-animation.scss';
</style>
<style lang="scss" scoped>
@import './Tooltip.scss';
</style>
