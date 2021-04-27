<template>
	<div
		:class="{
			'v3-input': true,
		}"
	>
		<!-- slot 优先级比传入的前缀、后缀、前置、后置图标高 -->
		<div class="v3-input__prepend" v-if="app.slots.prepend">
			<slot name="prepend"></slot>
		</div>
		<div
			class="v3-input__prepend"
			v-if="!app.slots.prepend && state.defaultProps.prependIcon"
		>
			<i
				:class="{
					'v3-icon': true,
					[state.defaultProps.prependIcon]: true,
				}"
			></i>
		</div>
		<div
			:class="{
				'v3-input__inner-wrapper': true,
				'has-prefix': app.slots.prefix || state.defaultProps.prefixIcon,
				'has-suffix': app.slots.suffix || state.defaultProps.suffixIcon,
				'has-prepend': app.slots.prepend || state.defaultProps.prependIcon,
				'has-append': app.slots.append || state.defaultProps.appendIcon,
			}"
		>
			<div class="v3-input__inner">
				<div class="v3-input__prefix" v-if="app.slots.prefix">
					<slot name="prefix"></slot>
				</div>
				<div
					class="v3-input__prefix"
					v-if="!app.slots.prefix && state.defaultProps.prefixIcon"
				>
					<i
						:class="{
							'v3-icon': true,
							[state.defaultProps.prefixIcon]: true,
						}"
					></i>
				</div>
				<input type="text" />
				<div class="v3-input__suffix" v-if="app.slots.suffix">
					<slot name="suffix"></slot>
				</div>
				<div
					class="v3-input__suffix"
					v-if="!app.slots.suffix && state.defaultProps.suffixIcon"
				>
					<i
						:class="{
							'v3-icon': true,
							[state.defaultProps.suffixIcon]: true,
						}"
					></i>
				</div>
			</div>
		</div>
		<div class="v3-input__append" v-if="app.slots.append">
			<slot name="append"></slot>
		</div>
		<div
			class="v3-input__append"
			v-if="!app.slots.append && state.defaultProps.appendIcon"
		>
			<i
				:class="{
					'v3-icon': true,
					[state.defaultProps.appendIcon]: true,
				}"
			></i>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, watch } from 'vue';
import * as TYPES from '../index';

export default defineComponent({
	name: 'V3Input',
	props: {
		type: String as () => TYPES.IInputType,
		suffixIcon: String as () => TYPES.IInputSuffixIcon,
		prefixIcon: String as () => TYPES.IInputPrefixIcon,
		prependIcon: String as () => TYPES.IInputPrependIcon,
		appendIcon: String as () => TYPES.IInputAppendIcon,
		clearable: Boolean as () => TYPES.IInputClearable,
		readonly: Boolean as () => TYPES.IInputReadonly,
		disabled: Boolean as () => TYPES.IInputDisabled,
	},
	setup(props, context) {
		const state = reactive({
			defaultProps: {
				type: 'text',
				suffixIcon: '',
				prefixIcon: '',
				prependIcon: '',
				appendIcon: '',
				clearable: false,
				readonly: false,
				disabled: false,
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
			app,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Input.scss';
</style>
