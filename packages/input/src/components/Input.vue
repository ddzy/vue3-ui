<template>
	<div
		:class="{
			'v3-input': true,
			'v3-input--disabled': state.defaultProps.disabled,
			'v3-input--clearable':
				state.defaultProps.clearable && state.isShowClearable,
			'v3-input--limitable':
				state.defaultProps.showWordLimit && state.defaultProps.maxlength > 0,
		}"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<!-- slot 优先级比传入的前缀、后缀、前置、后置图标高 -->
		<div class="v3-input__prepend-wrapper" v-if="app.slots.prepend">
			<div class="v3-input__prepend">
				<slot name="prepend"></slot>
			</div>
		</div>
		<div
			class="v3-input__prepend-wrapper"
			v-if="!app.slots.prepend && state.defaultProps.prependIcon"
		>
			<div class="v3-input__prepend">
				<i
					:class="{
						'v3-icon': true,
						[state.defaultProps.prependIcon]: true,
					}"
				></i>
			</div>
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
				<!-- 前缀区域 -->
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

				<!-- 输入框区域 -->
				<input
					:value="props.modelValue"
					:type="state.defaultProps.type"
					:readonly="state.defaultProps.readonly"
					:disabled="state.defaultProps.disabled"
					:placeholder="state.defaultProps.placeholder"
					:minlength="state.defaultProps.minlength"
					:maxlength="state.defaultProps.maxlength"
					@input="handleInput"
					@change="handleChange"
					@focus="handleFocus"
					@blur="handleBlur"
				/>

				<!-- 后缀区域 -->
				<div
					class="v3-input__suffix v3-input__suffix-item"
					v-if="app.slots.suffix"
				>
					<slot name="suffix"></slot>
				</div>
				<div
					class="v3-input__suffix v3-input__suffix-item"
					v-if="!app.slots.suffix && state.defaultProps.suffixIcon"
				>
					<i
						:class="{
							'v3-icon': true,
							[state.defaultProps.suffixIcon]: true,
						}"
					></i>
				</div>

				<!-- 清除按钮区域 -->
				<div
					class="v3-input__clear v3-input__suffix-item"
					v-if="state.defaultProps.clearable && state.isShowClearable"
				>
					<i class="v3-icon v3-icon-reeor" @click="handleClear"></i>
				</div>

				<!-- 输入字符数目限制区域 -->
				<!-- 当未指定【maxlength】的时候也要禁用【输入统计】 -->
				<div
					class="v3-input__limit v3-input__suffix-item"
					v-if="
						state.defaultProps.showWordLimit && state.defaultProps.maxlength > 0
					"
				>
					<span class="limit__item limit__current">{{
						state.currentWordCount
					}}</span>
					<span class="limit__item limit__separator">/</span>
					<span class="limit__item limit__total">{{
						state.totalWordCount
					}}</span>
				</div>
			</div>
		</div>
		<div class="v3-input__append-wrapper" v-if="app.slots.append">
			<div class="v3-input__append">
				<slot name="append"></slot>
			</div>
		</div>
		<div
			class="v3-input__append-wrapper"
			v-if="!app.slots.append && state.defaultProps.appendIcon"
		>
			<div class="v3-input__append">
				<i
					:class="{
						'v3-icon': true,
						[state.defaultProps.appendIcon]: true,
					}"
				></i>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	reactive,
	toRef,
	watch,
} from 'vue';
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
		placeholder: String as () => TYPES.IInputPlaceholder,
		showWordLimit: Boolean as () => TYPES.IInputShowWordLimit,
		minlength: Number as () => TYPES.IInputMinLength,
		maxlength: Number as () => TYPES.IInputMaxLength,
		modelValue: String,
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
				showWordLimit: false,
				minlength: -1,
				maxlength: -1,
				placeholder: '请输入内容',
			},
			/** 是否显示【清除】按钮 */
			isShowClearable: false,
			/** 当前输入的字符数 */
			currentWordCount: 0,
			/** 限制的最大可输入字符数 */
			totalWordCount: 0,
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
		watch(
			toRef(props, 'maxlength'),
			newValue => {
				// 实时监听【maxlength】的变化，更新最大输入字符数
				state.totalWordCount = newValue;
			},
			{ immediate: true }
		);
		watch(
			toRef(props, 'modelValue'),
			newValue => {
				// 实时监听输入框值的变化，更改字符统计的值
				state.currentWordCount = newValue.length;
			},
			{ immediate: true }
		);

		function handleMouseEnter() {
			// 鼠标移动到输入框内，显示清除按钮
			if (props.modelValue) {
				state.isShowClearable = true;
			}
		}

		function handleMouseLeave() {
			// 鼠标移出输入框，隐藏清除按钮
			state.isShowClearable = false;
		}

		function handleChange(e: Event) {
			const target = e.target as HTMLInputElement;
			context.emit('update:modelValue', target.value);
		}

		function handleInput(e: Event) {
			const target = e.target as HTMLInputElement;
			context.emit('update:modelValue', target.value);

			// 输入时需要实时显示【清空】按钮
			if (target.value && state.defaultProps.clearable) {
				state.isShowClearable = true;
			}
		}

		function handleFocus(e: Event) {
			context.emit('focus', e);
		}

		function handleBlur(e: Event) {
			context.emit('blur', e);
		}

		function handleClear() {
			context.emit('update:modelValue', '');
			context.emit('clear');
		}

		return {
			state,
			props,
			app,
			handleChange,
			handleInput,
			handleFocus,
			handleBlur,
			handleClear,
			handleMouseEnter,
			handleMouseLeave,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Input.scss';
</style>
