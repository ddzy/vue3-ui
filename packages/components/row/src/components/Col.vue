<template>
	<div class="v3-col">
		<slot></slot>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	watch,
} from 'vue';

import * as TYPES from '@/public/types/row';

export default defineComponent({
	name: 'V3Col',
	props: {},
	setup(props) {
		const state = reactive({
			defaultProps: {} as {},
		});
		const app = getCurrentInstance();

		watch(
			props,
			() => {
				state.defaultProps = {
					...state.defaultProps,
					...reactive(props),
				};
			},
			{
				immediate: true,
			}
		);

		return {
			app,
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped>
@import './Col.scss';
</style>
