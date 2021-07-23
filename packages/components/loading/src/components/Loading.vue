<template>
	<div class="v3-loading">loading component</div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import * as TYPES from '@/public/types/loading';

export default defineComponent({
	name: 'V3Loading',
	props: {
		/** 是否全屏显示 */
		fullscreen: {
			type: Boolean,
			default: false,
		},
		/** 是否避免滚动穿透 */
		fixed: {
			type: Boolean,
			default: true,
		},
		/** 自定义 loading 内容 */
		content: {
			type: [String, Object] as PropType<TYPES.ILoadingContent>,
			default: 'Loading...',
		},
		/** 自定义遮罩层的背景色 */
		backgroundColor: {
			type: String,
			default: '',
		},
		/** 自定义 loading 容器类名 */
		customClass: {
			type: String,
			default: '',
		},
	},
	setup(props: TYPES.ILoadingProps, context) {
		const state = reactive({});

		return {
			state,
			props,
			context,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Loading.scss';
</style>
