<template>
	<v3-base-popper customClass="v3-tooltip" v-bind="$attrs">
		<template v-for="(_, v) of context.slots" v-slot:[v]="scope">
			<slot v-bind="scope" :name="v"></slot>
		</template>
	</v3-base-popper>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import * as TYPES from '@/public/types/tooltip';
import V3BasePopper from 'base-popper';

interface IState {}

export default defineComponent({
	name: 'V3Tooltip',
	components: {
		V3BasePopper,
	},
	props: {
		title: {
			type: String,
			default: '',
		},
	},
	setup(props: TYPES.ITooltipProps, context) {
		const state: IState = reactive({});
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
@import './Tooltip.scss';
</style>
