<template>
	<v3-backdrop v-model="state.syncedModelValue">
		<transition name="v3-drawer-translate">
			<div class="v3-drawer" v-if="state.syncedModelValue">drawer</div>
		</transition>
	</v3-backdrop>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/drawer';
import V3Backdrop from '@components/backdrop/src/components/Backdrop.vue';
import V3Button from '@components/button/src/components/Button.vue';

export default defineComponent({
	name: 'V3Drawer',
	components: {
		V3Backdrop,
		V3Button,
	},
	props: {},
	setup(props: TYPES.IDrawerProps, context) {
		const state = reactive({
			syncedModelValue: false,
		});
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
@import './Drawer.scss';
</style>
