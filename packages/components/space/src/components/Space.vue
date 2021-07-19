<template>
	<div class="v3-space">space</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
} from 'vue';
import * as TYPES from '@/public/types/space';

export default defineComponent({
	name: 'V3Space',
	props: {
		/** 自定义 space 容器的类名 */
		customClass: {
			type: String,
			default: '',
		},
		/** 同 flex 布局的 align-items */
		align: {
			type: String as PropType<TYPES.ISpaceAlign>,
			default: 'flex-start',
			validator(v: string) {
				return ['start', 'end', 'center', 'flex-start', 'flex-end'].includes(v);
			},
		},
		/** 同 flex 布局的 flex-direction */
		direction: {
			type: String as PropType<TYPES.ISpaceDirection>,
			default: 'row',
			validator(v: string) {
				return ['row', 'column', 'row-reverse', 'column-reverse'].includes(v);
			},
		},
		/** 同 flex 布局的 flex-wrap */
		wrap: {
			type: Boolean,
			default: true,
		},
		/** 自定义分隔符，默认为空格 */
		separator: {
			type: [String, Object] as PropType<TYPES.ISpaceSeparator>,
			default: '',
		},
		/** 间隔大小 */
		size: {
			type: Number,
			default: 6,
		},
	},
	setup(props: TYPES.ISpaceProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			state,
			props,
			context,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Space.scss';
</style>
