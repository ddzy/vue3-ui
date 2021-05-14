<template>
	<div
		:class="{
			['v3-row']: true,
			[`v3-row--${props.type}`]: true,
			[`is-justify-${props.justify}`]: props.type === 'flex',
			[`is-align-${props.align}`]: props.type === 'flex',
		}"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	provide,
	reactive,
} from 'vue';

import * as TYPES from '@/public/types/row';
import { ROW_INSTANCE_PROVIDE } from '@common/constants/provide-symbol';

export default defineComponent({
	name: 'V3Row',
	props: {
		/** 行间距 */
		gutter: {
			type: Number as PropType<TYPES.IRowGutter>,
			default: 0,
		},
		/** 布局类型（默认为：flexbox）*/
		type: {
			type: String as PropType<TYPES.IRowType>,
			default: 'flex',
		},
		/** 同 flex 布局的 justify-content 属性（只在 type = flex）时有效 */
		justify: {
			type: String as PropType<TYPES.IRowJustify>,
			default: 'flex-start',
			validator: (v: string) => {
				return [
					'start',
					'end',
					'center',
					'space-around',
					'space-between',
					'flex-start',
					'flex-end',
				].includes(v);
			},
		},
		/** 同 flex 布局的 align-items 属性（只在 type = flex）时有效 */
		align: {
			type: String as PropType<TYPES.IRowAlign>,
			default: 'flex-start',
			validator: (v: string) => {
				return ['start', 'end', 'center', 'flex-start', 'flex-end'].includes(v);
			},
		},
	},
	setup(props: TYPES.IRowProps) {
		const state = reactive({});
		const app = getCurrentInstance();

		provide(ROW_INSTANCE_PROVIDE, app);

		return {
			app,
			state,
			props,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Row.scss';
</style>
