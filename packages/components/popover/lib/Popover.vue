<template>
	<v3-base-popper customClass="v3-popover" v-bind="$attrs">
		<template v-for="(_, v) of context.slots" v-slot:[v]="scope">
			<slot v-bind="scope" :name="v"></slot>
		</template>
	</v3-base-popper>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/popover';
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import V3BasePopper from 'base-popper';

interface IState {}

export default defineComponent({
	name: 'V3Popover',
	components: {
		V3BasePopper,
	},
	setup(props: TYPES.IPopoverProps, context) {
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
@import './Popover.scss';
</style>
