<template>
	<div
		:class="{
			['v3-select']: true,
		}"
	>
		<div ref="triggerRef" class="v3-select__trigger">
			<v3-input :readonly="true"></v3-input>
		</div>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/select';
import VARIABLE from '@common/constants/internal-variable';
import 'tippy.js/themes/light.css';
import {
	defineComponent,
	getCurrentInstance,
	onMounted,
	reactive,
	ref,
} from 'vue';
import { useTippy } from 'vue-tippy';
import SelectDropdown from './SelectDropDown.vue';

export default defineComponent({
	name: 'V3Select',
	props: {},
	components: {
		SelectDropdown,
	},
	setup(props: TYPES.ISelectProps) {
		const triggerRef = ref(document.createElement('div'));
		const state = reactive({});
		const app = getCurrentInstance();

		onMounted(() => {
			const { tippy } = useTippy(
				triggerRef,
				{
					content: SelectDropdown,
					animation: 'v3-select-slide-fade',
					theme: 'light',
					trigger: 'click',
					arrow: true,
					interactive: true,
					allowHTML: true,
					delay: 0,
					zIndex: VARIABLE.getNextZIndex(),
					appendTo: 'parent',
					placement: 'bottom',
					offset: [0, 10],
				},
				{ mount: true }
			);
		});

		return {
			app,
			state,
			props,
			triggerRef,
		};
	},
});
</script>
<style lang="scss">
@import '@common/styles/global-animation.scss';
</style>
<style lang="scss" scoped>
@import './Select.scss';
</style>
