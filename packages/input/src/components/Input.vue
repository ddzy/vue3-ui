<template>
	<div
		:class="{
			'v3-input': true,
		}"
	>
		<div class="v3-input__prepend" v-if="app.slots.prepend">
			<slot name="prepend"></slot>
		</div>
		<div class="v3-input__inner">
			<div class="v3-input__prefix" v-if="app.slots.prefix">
				<slot name="prefix"></slot>
			</div>
			<input type="text" />
			<div class="v3-input__suffix" v-if="app.slots.suffix">
				<slot name="suffix"></slot>
			</div>
		</div>
		<div class="v3-input__append" v-if="app.slots.append">
			<slot name="append"></slot>
		</div>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	onMounted,
	reactive,
	watch,
} from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3Input',
	props: {
		type: String as () => TYPES.IInputType,
	},
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				type: 'text',
			},
		});
		const app = getCurrentInstance();

		watch(props, () => {
			state.defaultProps = {
				...state.defaultProps,
				...reactive(props),
			};
		});

		return {
			state,
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Input.scss';
</style>
