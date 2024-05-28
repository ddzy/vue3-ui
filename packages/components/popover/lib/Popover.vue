<template>
	<v3-base-popper
		customClass="v3-popover"
		customDropdownClass="v3-popover__dropdown"
		customTriggerClass="v3-popover__trigger"
		v-bind="$attrs"
	>
		<template v-for="(_, v) of context.slots" v-slot:[v]="scope">
			<slot v-bind="scope" :name="v"></slot>
		</template>
	</v3-base-popper>
</template>
<script lang="ts">
import * as TYPES from '@typings/index';
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import V3BasePopper from '@components/base-popper/main';

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
