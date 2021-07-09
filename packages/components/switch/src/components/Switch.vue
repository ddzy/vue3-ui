<template>
	<div
		:class="{
			'v3-switch': true,
			'is-disabled': props.disabled,
			'is-loading': props.loading,
			'is-active': state.isChecked,
			'is-disabled': props.disabled,
		}"
		:style="{
			'--active-color': hexToRgba(props.activeColor, 1),
			'--inactive-color': hexToRgba(props.inactiveColor, 1),
			'--active-color-half': hexToRgba(props.activeColor, 0.5),
			'--inactive-color-half': hexToRgba(props.inactiveColor, 0.5),
			'--active-color-little': hexToRgba(props.activeColor, 0.3),
			'--inactive-color-little': hexToRgba(props.inactiveColor, 0.3),
			'--move-duration': `${state.duration}s`,
		}"
	>
		<input
			type="checkbox"
			class="v3-switch__input"
			:value="state.isChecked"
			:id="`v3-switch__input--${app.uid}`"
		/>

		<label
			v-if="props.inactiveLabel || props.inactiveIcon"
			:for="state.isChecked ? `v3-switch__input--${app.uid}` : ''"
			:class="{
				'v3-switch__label': true,
				'v3-switch__inactive': true,
			}"
			@click="handleSwitch"
		>
			<!-- 状态图标比文字的优先级高 -->
			<i
				class="v3-icon"
				v-if="props.inactiveIcon"
				:class="[props.inactiveIcon || '']"
			></i>
			<span v-if="!props.inactiveIcon && props.inactiveLabel">{{
				props.inactiveLabel
			}}</span>
		</label>

		<div
			class="v3-switch__select"
			:style="{
				width: `${props.width}px`,
			}"
			@click="handleSwitch"
		></div>

		<label
			v-if="props.activeLabel || props.activeIcon"
			:for="state.isChecked ? '' : `v3-switch__input--${app.uid}`"
			:class="{
				'v3-switch__label': true,
				'v3-switch__active': true,
			}"
			@click="handleSwitch"
		>
			<!-- 状态图标比文字的优先级高 -->
			<i
				class="v3-icon"
				v-if="props.activeIcon"
				:class="[props.activeIcon || '']"
			></i>
			<span v-else-if="!props.activeIcon && props.activeLabel">{{
				props.activeLabel
			}}</span>
		</label>
	</div>
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
import { hexToRgba } from '@common/utils/index';
import * as TYPES from '@/public/types/switch';

export default defineComponent({
	name: 'V3Switch',
	props: {
		/** 绑定值，默认为 true/false */
		modelValue: {
			type: [Boolean, String, Number] as PropType<TYPES.ISwitchModelValue>,
			required: true,
		},
		/** 是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 是否加载中 */
		loading: {
			type: Boolean,
			default: false,
		},
		/** 开关的宽度（px） */
		width: {
			type: Number,
			default: 35,
		},
		/** 开启状态下的图标（会覆盖 activeLabel） */
		activeIcon: {
			type: String,
			default: '',
		},
		/** 关闭状态下的图标（会覆盖 inactiveLabel） */
		inactiveIcon: {
			type: String,
			default: '',
		},
		/** 开启状态下的值 */
		activeValue: {
			type: [Boolean, String, Number] as PropType<TYPES.ISwitchModelValue>,
			default: true,
		},
		/** 关闭状态下的值 */
		inactiveValue: {
			type: [Boolean, String, Number] as PropType<TYPES.ISwitchModelValue>,
			default: false,
		},
		/** 开启状态下的文本 */
		activeLabel: {
			type: String,
			default: '',
		},
		/** 关闭状态下的文本 */
		inactiveLabel: {
			type: String,
			default: '',
		},
		/** 开启状态下的颜色（必须为16进制格式） */
		activeColor: {
			type: String,
			default: '#63B931',
		},
		/** 关闭状态下的颜色（必须为16进制格式） */
		inactiveColor: {
			type: String,
			default: '#C91B26',
		},
	},
	setup(props: TYPES.ISwitchProps, context) {
		const state = reactive({
			/** 当前开关是否选中 */
			isChecked: false,
			/** 动画的过渡时间 */
			duration: 0.15,
		});
		const app = ref(getCurrentInstance()).value;

		watch(
			toRef(props, 'modelValue'),
			() => {
				if (typeof props.modelValue === 'boolean') {
					state.isChecked = props.modelValue;
				}
			},
			{ immediate: true }
		);

		watch(
			toRef(props, 'width'),
			() => {
				// 根据不同的宽度，动态计算动画的过渡时间
				state.duration = (0.15 * props.width) / 35;
			},
			{ immediate: true }
		);

		function handleSwitch() {
			if (props.disabled) {
				return;
			}

			if (typeof props.modelValue === 'boolean') {
				context.emit('update:modelValue', !state.isChecked);
			}
		}

		return {
			props,
			context,
			app,
			state,
			hexToRgba,
			handleSwitch,
		};
	},
});
</script>
<style lang="scss" scoped>
@import './Switch.scss';
</style>
