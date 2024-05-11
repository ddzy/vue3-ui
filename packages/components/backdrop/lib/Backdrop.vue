<template>
	<transition name="v3-backdrop-fade">
		<div
			class="v3-backdrop"
			v-show="props.modelValue"
			:id="`v3-backdrop-${app.uid}`"
			:style="{
				zIndex: VARIABLE.getNextZIndex(),
			}"
			:class="`${props.customClass} ${props.center ? 'is-center' : ''}`"
		>
			<slot></slot>
		</div>
	</transition>
</template>
<script lang="ts">
import {
	defineComponent,
	getCurrentInstance,
	reactive,
	ref,
	toRef,
	watch,
} from 'vue';
import * as TYPES from '@typings/index';
import VARIABLE from '@common/constants/internal-variable';

export default defineComponent({
	name: 'V3Backdrop',
	props: {
		/** 遮罩层的显隐状态 */
		modelValue: {
			type: Boolean,
			required: true,
		},
		/** 是否避免滚动穿透 */
		fixed: {
			type: Boolean,
			default: false,
		},
		/** 自定义遮罩层的类名 */
		customClass: {
			type: String,
			default: '',
		},
		/** 内部的元素是否要水平垂直居中 */
		center: {
			type: Boolean,
			default: true,
		},
	},
	setup(props: TYPES.IBackdropProps, context) {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		watch(
			toRef(props, 'modelValue'),
			() => {
				computeBodyClass();
			},
			{ immediate: true },
		);

		/**
		 * 解决滚动穿透
		 */
		function computeBodyClass() {
			if (props.modelValue) {
				if (props.fixed) {
					document.body.classList.add('v3-body--fixed');
				}
			} else {
				document.body.classList.remove('v3-body--fixed');
			}
		}

		return {
			props,
			state,
			app,
			VARIABLE,
		};
	},
});
</script>
<style lang="scss">
.v3-body--fixed {
	overflow: hidden;
}
</style>
<style lang="scss">
@import './Backdrop.scss';
</style>
