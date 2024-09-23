<template>
	<v3-base-popper
		:appendTo="appendTo"
		customClass="v3-tooltip"
		customDropdownClass="v3-tooltip__dropdown"
		customTriggerClass="v3-tooltip__trigger"
		v-bind="$attrs"
	>
		<template v-for="(_, v) of context.slots" v-slot:[v]="scope">
			<slot v-bind="scope" :name="v"></slot>
		</template>
	</v3-base-popper>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';

import * as TYPES from '@typings/index';
import V3BasePopper from '@components/base-popper/main';

interface IState {}

export default defineComponent({
	name: 'V3Tooltip',
	components: {
		V3BasePopper,
	},
	setup(props: TYPES.ITooltipProps, context) {
		const state: IState = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			state,
			app,
			props,
			context,
			appendTo: document.body,
		};
	},
});
</script>
<style lang="scss">
body {
	div[data-tippy-root] {
		.tippy-content {
			.v3-tooltip__dropdown {
				padding: $padding-small $padding-medium;
				font-size: $font-size-small;
			}
		}
	}
}
</style>
<style lang="scss">
@import './Tooltip.scss';
</style>
