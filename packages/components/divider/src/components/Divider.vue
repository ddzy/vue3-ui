<template>
	<div class="v3-divider">divider</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';

export default defineComponent({
	name: 'V3Divider',
	setup(props, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			state,
			props,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Divider.scss';
</style>
