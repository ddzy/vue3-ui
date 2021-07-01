<template>
	<div class="v3-dialog">123</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import * as TYPES from '@/public/types/dialog';

export default defineComponent({
	name: 'V3Dialog',
	props: {
		/** 弹窗的显隐状态 */
		modelValue: {
			type: Boolean,
			required: true,
		},
	},
	setup(props: TYPES.IDialogProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			props,
			context,
			state,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Dialog.scss';
</style>
