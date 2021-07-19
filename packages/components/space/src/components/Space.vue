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
	props: {},
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
