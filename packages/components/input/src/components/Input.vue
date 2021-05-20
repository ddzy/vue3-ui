<template>
	<div
		:class="{
			'v3-input': true,
			'v3-input--disabled': props.disabled,
			'v3-input--invalid': !state.isValidSuccess,
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
			v-if="!app.slots.prepend && props.prependIcon"
		>
			<div class="v3-input__prepend">
				<i
					:class="{
						'v3-icon': true,
						[props.prependIcon]: true,
					}"
				></i>
			</div>
		</div>
		<div
			:class="{
				'v3-input__inner-wrapper': true,
				'has-prefix': app.slots.prefix || props.prefixIcon,
				'has-suffix': app.slots.suffix || props.suffixIcon,
				'has-prepend': app.slots.prepend || props.prependIcon,
				'has-append': app.slots.append || props.appendIcon,
			}"
		>
			<div class="v3-input__inner">
				<!-- 前缀区域 -->
				<div class="v3-input__prefix" v-if="app.slots.prefix">
					<slot name="prefix"></slot>
				</div>
				<div
					class="v3-input__prefix"
					v-if="!app.slots.prefix && props.prefixIcon"
				>
					<i
						:class="{
							'v3-icon': true,
							[props.prefixIcon]: true,
						}"
					></i>
				</div>

				<!-- 输入框区域 -->
				<input
					:value="props.modelValue"
					:type="state.defaultProps.type"
					:readonly="props.readonly"
					:disabled="props.disabled"
					:placeholder="props.placeholder"
					:minlength="props.minlength"
					:maxlength="props.maxlength"
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
					v-if="!app.slots.suffix && props.suffixIcon"
				>
					<i
						:class="{
							'v3-icon': true,
							[props.suffixIcon]: true,
						}"
					></i>
				</div>

				<!-- 清除按钮区域 -->
				<div
					class="v3-input__clear v3-input__suffix-item"
					v-if="props.clearable && state.isShowClearable"
				>
					<i class="v3-icon v3-icon-reeor" @click="handleClear"></i>
				</div>

				<!-- 切换密码区域 -->
				<div
					class="v3-input__password v3-input__suffix-item"
					v-if="props.showPassword"
				>
					<i
						:class="{
							'v3-icon': true,
							'v3-icon-browse': state.isPasswordClearly,
							'v3-icon-Notvisible': !state.isPasswordClearly,
						}"
						@click="togglePasswordClearly"
					></i>
				</div>

				<!-- 输入字符数目限制区域 -->
				<!-- 当未指定【maxlength】的时候也要禁用【输入统计】 -->
				<div
					class="v3-input__limit v3-input__suffix-item"
					v-if="props.showWordLimit && props.maxlength > 0"
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
			v-if="!app.slots.append && props.appendIcon"
		>
			<div class="v3-input__append">
				<i
					:class="{
						'v3-icon': true,
						[props.appendIcon]: true,
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
	PropType,
	reactive,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@/public/types/input';

export default defineComponent({
	name: 'V3Input',
	props: {
		/** 输入框的类型 */
		type: {
			type: String as PropType<TYPES.IInputType>,
			default: 'text',
			validator: (v: string) => {
				return ['text', 'password'].includes(v);
			},
		},
		/** 后缀图标 */
		suffixIcon: {
			type: String,
			default: '',
		},
		/** 前缀图标 */
		prefixIcon: {
			type: String,
			default: '',
		},
		/** 前置图标 */
		prependIcon: {
			type: String,
			default: '',
		},
		/** 后置图标 */
		appendIcon: {
			type: String,
			default: '',
		},
		/** 是否显示清除按钮 */
		clearable: {
			type: Boolean,
			default: false,
		},
		/** 是否只读 */
		readonly: {
			type: Boolean,
			default: false,
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 是否显示字数统计 */
		showWordLimit: {
			type: Boolean,
			default: false,
		},
		/** 限制输入的最小数目 */
		minlength: {
			type: Number,
			default: -1,
		},
		/** 限制输入的最大数目 */
		maxlength: {
			type: Number,
			default: -1,
		},
		placeholder: {
			type: String,
			default: '请输入内容',
		},
		/** 是否显示切换密码按钮 */
		showPassword: {
			type: Boolean,
			default: false,
		},
		modelValue: {
			type: String,
			default: '',
		},
	},
	setup(props: TYPES.IInputProps, context) {
		const state = reactive({
			defaultProps: {
				type: '',
			},
			/** 是否显示【清除】按钮 */
			isShowClearable: false,
			/** 当前输入的字符数 */
			currentWordCount: 0,
			/** 限制的最大可输入字符数 */
			totalWordCount: 0,
			/** 输入的密码是否明文显示 */
			isPasswordClearly: true,
			/** 是否验证成功 */
			isValidSuccess: true,
		});
		const app = getCurrentInstance();

		watch(
			props,
			() => {
				state.defaultProps.type = props.type;
			},
			{ immediate: true }
		);
		watch(
			toRef(props, 'maxlength'),
			newValue => {
				// 实时监听【maxlength】的变化，更新最大输入字符数
				state.totalWordCount = newValue!;

				if (props.modelValue && props.showWordLimit) {
					// 如果最大值小于当前的输入值的长度，并且最小值大于最大值，那么验证失败
					state.isValidSuccess =
						newValue! >= props.modelValue.length && newValue! > props.minlength;
				} else {
					state.isValidSuccess = true;
				}
			},
			{ immediate: true }
		);
		watch(
			toRef(props, 'modelValue'),
			newValue => {
				if (newValue) {
					// 实时监听输入框值的变化，更改字符统计的值
					state.currentWordCount = newValue.length;

					if (props.showWordLimit) {
						// 如果值的长度大于已限制的最大数目，那么验证失败
						state.isValidSuccess = props.maxlength >= newValue.length;
					}
				} else {
					state.currentWordCount = 0;
					state.isValidSuccess = true;
				}
			},
			{ immediate: true }
		);
		watch(
			toRef(state, 'isPasswordClearly'),
			newValue => {
				state.defaultProps.type = newValue ? 'text' : 'password';
			},
			{ immediate: true }
		);
		watch(
			toRef(props, 'type'),
			newValue => {
				if (newValue === 'password') {
					state.isPasswordClearly = false;
				}
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
			if (target.value && props.clearable) {
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

		function togglePasswordClearly() {
			state.isPasswordClearly = !state.isPasswordClearly;
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
			togglePasswordClearly,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Input.scss';
</style>
