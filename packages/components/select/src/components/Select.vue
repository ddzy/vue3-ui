<template>
	<div
		:class="{
			['v3-select']: true,
		}"
	>
		<div ref="triggerRef" class="v3-select__trigger">
			<v3-input :readonly="true"></v3-input>
		</div>
		<div ref="dropdownRef" class="v3-select__dropdown"></div>
	</div>
</template>
<script lang="ts">
import * as TYPES from '@/public/types/select';
import VARIABLE from '@common/constants/internal-variable';
import 'tippy.js/themes/light-border.css';
import {
	ComponentInternalInstance,
	createVNode,
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
		const dropdownRef = ref(document.createElement('div'));
		const state = reactive({});
		const app = getCurrentInstance() as ComponentInternalInstance;

		onMounted(() => {
			const { tippy } = useTippy(
				triggerRef,
				{
					content: createVNode(SelectDropdown, {
						width: triggerRef.value.getBoundingClientRect().width || 0,
					}),
					animation: 'v3-select-slide-fade',
					theme: 'light-border',
					trigger: 'click',
					arrow: true,
					interactive: true,
					allowHTML: true,
					delay: 0,
					zIndex: VARIABLE.getNextZIndex(),
					appendTo: dropdownRef.value,
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
			dropdownRef,
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
