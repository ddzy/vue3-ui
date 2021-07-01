<template>
	<div class="v3-dialog">123</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
} from 'vue';
import * as TYPES from '@/public/types/dialog';

export default defineComponent({
	name: 'V3Dialog',
	props: {
		/** 弹窗的显隐状态 */
		modelValue: {
			type: Boolean,
			required: true,
		},
		/** 弹窗的标题 */
		title: {
			type: String,
			default: '',
		},
		/** 弹窗宽度 */
		width: {
			type: String,
			default: '50%',
		},
		/** 弹窗整体是否水平垂直居中 */
		center: {
			type: Boolean,
			default: true,
		},
		/** 是否全屏展示 */
		fullscreen: {
			type: Boolean,
			default: false,
		},
		/** 是否显示遮罩层 */
		backdrop: {
			type: Boolean,
			default: true,
		},
		/** 是否禁止滚动穿透 */
		fixed: {
			type: Boolean,
			default: true,
		},
		/** 自定义弹窗的类名 */
		customClass: {
			type: String,
			default: '',
		},
		/** 点击遮罩层时是否同时关闭弹窗 */
		closeOnClickBackdrop: {
			type: Boolean,
			default: true,
		},
		/** 是否显示关闭按钮 */
		showClose: {
			type: Boolean,
			default: true,
		},
		/** header 区域的操作按钮组 */
		headerActions: {
			type: Array as PropType<TYPES.IDialogHeaderActionItem[]>,
			default: [],
		},
		/** 关闭弹窗前要触发的事件（执行 done 回调则表明关闭弹窗，反之则不关闭） */
		beforeClose: {
			type: Function as PropType<TYPES.IDialogBeforeClose>,
			default: null,
		},
	},
	setup(props: TYPES.IDialogProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			props,
			context,
			state,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Dialog.scss';
</style>
