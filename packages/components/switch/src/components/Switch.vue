<template>
	<div class="v3-switch">1</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import * as TYPES from '@/public/types/switch';

export default defineComponent({
	setup(props: TYPES.ISwitchProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			props,
			context,
			app,
			state,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Switch.scss';
</style>
