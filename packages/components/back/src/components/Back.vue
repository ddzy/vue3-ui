<template>
	返回顶部/去底部
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/back';
import VARIABLE from '@common/constants/internal-variable';

export default defineComponent({
	name: 'V3Backdrop',
	props: {
		/** 页面滚动距离超过该值时显示 */
		distance: {
			type: Number,
			default: 400,
		},
		/** 是否显示“去顶部”按钮 */
		showTop: {
			type: Boolean,
			default: true,
		},
		/** 是否显示去底部按钮 */
		showBottom: {
			type: Boolean,
			default: true,
		},
		target: {
			type: Object as PropType<TYPES.IBackTarget>,
			default: () => window,
			validator(v: any) {
				return v === window || v instanceof HTMLElement;
			},
		},
	},
	setup(props: TYPES.IBackProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			props,
			state,
			app,
			VARIABLE,
		};
	},
});
</script>
<style lang="scss">
.v3-body--fixed {
	overflow: hidden;
}
</style>
<style lang="scss" scoped>
@import './Back.scss';
</style>
