<template>
	<div>
		message
	</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, PropType, reactive } from 'vue';

import * as TYPES from '@/public/types/row';

export default defineComponent({
	name: 'V3Message',
	props: {},
	setup(props) {
		const state = reactive({});
		const app = getCurrentInstance();

		return {
			app,
			state,
			props,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Message.scss';
</style>
