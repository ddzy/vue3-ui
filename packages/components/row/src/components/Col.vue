<template>
	<div
		:class="{
			'v3-col': true,
			[`v3-col-span-${props.span}`]: props.span,
		}"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	inject,
	PropType,
	reactive,
} from 'vue';

import * as TYPES from '@/public/types/row';
import { ROW_INSTANCE_PROVIDE } from '@common/constants/provide-symbol';

export default defineComponent({
	name: 'V3Col',
	props: {
		/** 所占行数（总数 12）*/
		span: {
			type: Number as PropType<TYPES.IColSpan>,
			default: 0,
		},
		/** 距主轴左侧偏移量 */
		offset: {
			type: Number as PropType<TYPES.IColOffset>,
			default: 0,
		},
		/** 相对于自身，向其右侧的偏移量 */
		push: {
			type: Number as PropType<TYPES.IColPush>,
			default: 0,
		},
		/** 相对于自身，向其左侧的偏移量 */
		pull: {
			type: Number as PropType<TYPES.IColPull>,
			default: 0,
		},
		/** < 576px */
		xs: {
			type: [Number, Object] as PropType<TYPES.IColXS>,
			default: 0,
		},
		/** < 768px */
		sm: {
			type: [Number, Object] as PropType<TYPES.IColSM>,
			default: 0,
		},
		/** < 992px */
		md: {
			type: [Number, Object] as PropType<TYPES.IColMD>,
			default: 0,
		},
		/** < 1200px */
		lg: {
			type: [Number, Object] as PropType<TYPES.IColLG>,
			default: 0,
		},
		/** < 1400px */
		xl: {
			type: [Number, Object] as PropType<TYPES.IColXL>,
			default: 0,
		},
	},
	setup(props: TYPES.IColProps) {
		const state = reactive({
			/** 父级 v3-row 实例 */
			injectedRowInstance: null,
		});
		const app = getCurrentInstance();
		const isDirectRow = checkIsDirectRow();

		if (isDirectRow) {
			state.injectedRowInstance = inject(ROW_INSTANCE_PROVIDE)!;
		}

		/**
		 * 检查当前 col 的直属父级是否为 row
		 */
		function checkIsDirectRow() {
			return app?.parent && app?.parent.type.name === 'V3Row';
		}

		return {
			app,
			state,
			props,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped>
@import './Col.scss';
</style>
