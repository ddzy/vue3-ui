<template>
	<button
		ref="buttonRef"
		:disabled="state.defaultProps.disabled"
		:type="props.nativeType"
		:class="{
			'v3-button': true,
			[`is-type-${props.type}`]: true,
			[`has-border--${props.borderType}`]: !!props.borderType,
			[`is-plain`]: props.plain,
			[`is-disabled`]: state.defaultProps.disabled,
			[`is-circle`]: props.circle,
			[`is-loading`]: props.loading,
			[`is-size--${props.size}`]: props.size,
		}"
	>
		<a v-if="props.type === 'text'" @click.prevent>
			<V3Icon
				v-if="state.defaultProps.icon"
				:type="state.defaultProps.icon"
				:spin="props.loading"
			/>
			<span>
				<slot></slot>
			</span>
		</a>
		<template v-else>
			<V3Icon
				v-if="state.defaultProps.icon"
				:type="state.defaultProps.icon"
				:spin="props.loading"
			/>
			<span>
				<slot></slot>
			</span>
		</template>
	</button>
</template>
<script lang="ts">
import {
	PropType,
	defineComponent,
	onMounted,
	onUnmounted,
	reactive,
	ref,
	watch,
} from 'vue';

import * as TYPES from '@typings/index';
import V3Icon from '@components/icon/main';

export default defineComponent({
	name: 'V3Button',
	components: {
		V3Icon,
	},
	props: {
		/** 按钮的类型 */
		type: {
			type: String as PropType<TYPES.IButtonType>,
			default: 'default',
			validator: (v: string) => {
				return [
					'primary',
					'success',
					'danger',
					'default',
					'warning',
					'info',
					'text',
				].includes(v);
			},
		},
		/** 按钮的原生类型 */
		nativeType: {
			type: String as PropType<TYPES.IButtonNativeType>,
			default: 'button',
			validator: (v: string) => {
				return ['button', 'submit', 'reset'].includes(v);
			},
		},
		/** 边框类型 */
		borderType: {
			type: String as PropType<TYPES.IButtonBorderType>,
			default: '',
			validator: (v: string) => {
				return [
					'',
					'solid',
					'dashed',
					'dotted',
					'double',
					'groove',
					'outset',
				].includes(v);
			},
		},
		/** 按钮是否禁用 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/** 是否为朴素按钮 */
		plain: {
			type: Boolean,
			default: false,
		},
		/** 按钮上的图标 */
		icon: {
			type: String,
			default: '',
		},
		/** 是否为圆形按钮 */
		circle: {
			type: Boolean,
			default: false,
		},
		/** 按钮的 loading 状态 */
		loading: {
			type: Boolean,
			default: false,
		},
		/** 按钮尺寸 */
		size: {
			type: String as PropType<TYPES.IButtonSize>,
			default: 'medium',
			validator(v: string) {
				return ['small', 'medium', 'large'].includes(v);
			},
		},
	},
	setup(props: Required<TYPES.IButtonProps>, context) {
		const state = reactive({
			defaultProps: {
				icon: '',
				disabled: false,
			},
		});
		const buttonRef = ref(document.createElement('button'));

		watch(
			props,
			(newValue) => {
				// 按钮 loading 时展示特定的 icon
				state.defaultProps.icon = newValue.loading
					? 'LoadingOne'
					: newValue.icon
						? newValue.icon
						: '';
				// 按钮 loading 时也为禁用状态
				state.defaultProps.disabled = !!newValue.disabled || !!newValue.loading;
			},
			{ immediate: true },
		);

		function buttonClickListener(e: Event) {
			const button = buttonRef.value as HTMLButtonElement;
			const path = e.composedPath();

			if (path.includes(button)) {
				button.classList.remove('is-active');
				button.offsetTop;
				button.classList.add('is-active');
			}
		}

		function buttonAnimationEndListener(e: Event) {
			const button = buttonRef.value as HTMLButtonElement;
			const path = e.composedPath();

			if (path.includes(button)) {
				button.classList.remove('is-active');
			}
		}

		onMounted(() => {
			const button = buttonRef.value as HTMLButtonElement;

			button.addEventListener('click', buttonClickListener, false);
			button.addEventListener(
				'animationend',
				buttonAnimationEndListener,
				false,
			);
		});
		onUnmounted(() => {
			const button = buttonRef.value as HTMLButtonElement;

			button && button.removeEventListener('click', buttonClickListener);
			button &&
				button.removeEventListener('animationend', buttonAnimationEndListener);
		});

		return {
			state,
			props,
			context,
			buttonRef,
		};
	},
});
</script>
<style lang="scss">
@import './Button.scss';
</style>
