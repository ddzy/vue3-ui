<template>
	返回顶部/去底部
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/back';
import VARIABLE from '@common/constants/internal-variable';

export default defineComponent({
	name: 'V3Backdrop',
	props: {},
	setup(props: TYPES.IBackProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		return {
			props,
			state,
			app,
			VARIABLE,
		};
	},
});
</script>
<style lang="scss">
.v3-body--fixed {
	overflow: hidden;
}
</style>
<style lang="scss" scoped>
@import './Back.scss';
</style>
