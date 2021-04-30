<template>
	<div
		:class="{
			'v3-radio': true,
		}"
	>
		<label for="v3-radio__input" class="v3-radio__label-wrapper">
			<input
				id="v3-radio__input"
				type="radio"
				class="v3-radio__input"
				:value="state.defaultProps.label"
			/>

			<div class="v3-radio__select"></div>
			<div class="v3-radio__label">
				<slot></slot>
			</div>
		</label>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	PropType,
	reactive,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3Radio',
	props: {
		border: Boolean as PropType<TYPES.IRadioBorder>,
		disabled: Boolean as PropType<TYPES.IRadioDisabled>,
		label: {
			type: (Boolean || String || Number) as PropType<TYPES.IRadioLabel>,
			validator(label) {
				return (
					typeof label === 'boolean' ||
					typeof label === 'string' ||
					typeof label === 'number'
				);
			},
		},
	},
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				border: false,
				disabled: false,
				label: '',
			},
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
			{ immediate: true }
		);
		return {
			state,
			props,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Radio.scss';
</style>
