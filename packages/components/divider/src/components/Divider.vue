<template>
	<div class="v3-divider">divider</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
} from 'vue';
import * as TYPES from '@/public/types/divider';

export default defineComponent({
	name: 'V3Divider',
	props: {
		/** 分割线的方向（水平/垂直） */
		direction: {
			type: String as PropType<TYPES.IDividerDirection>,
			default: 'vertical',
			validator(v: string) {
				return ['vertical', 'horizontal'].includes(v);
			},
		},
		/** 内容的位置 */
		contentPosition: {
			type: String as PropType<TYPES.IDividerContentPosition>,
			default: 'start',
			validator(v: string) {
				return ['start', 'end', 'center'].includes(v);
			},
		},
	},
	setup(props: TYPES.IDividerProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			state,
			props,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Divider.scss';
</style>
