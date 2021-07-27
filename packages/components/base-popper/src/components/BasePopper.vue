<template>
	<div class="v3-base-popper">1</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/base-popper';
import VARIABLE from '@common/constants/internal-variable';
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
} from 'vue';

interface IState {
	nextZIndex: number;
	showDropdown: boolean;
}

export default defineComponent({
	name: 'V3BasePopper',
	components: {},
	props: {},
	setup(props: TYPES.IBasePopperProps, context) {
		const state: IState = reactive({
			/** base-popper 的 z-index（统一管理） */
			nextZIndex: VARIABLE.getNextZIndex(),
			/** base-popper 的显隐状态 */
			showDropdown: false,
		});
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
<style lang="scss" scoped>
@import './BasePopper.scss';
</style>
