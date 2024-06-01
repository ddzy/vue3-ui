<template>
	<teleport to="body">
		<transition name="v3-backdrop-fade">
			<div
				v-show="props.modelValue"
				class="v3-backdrop"
				:id="`v3-backdrop-${app.uid}`"
				:style="{
					zIndex: VARIABLE.getNextZIndex(),
				}"
				:class="`${props.customClass} ${props.center ? 'is-center' : ''}`"
				@click="close"
			>
				<slot></slot>
			</div>
		</transition>
	</teleport>
</template>
<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, watch } from 'vue';
import type { IBackdropProps } from '@typings/index';
import VARIABLE from '@common/constants/internal-variable';

defineOptions({
	name: 'V3Backdrop',
});
const props = withDefaults(defineProps<IBackdropProps>(), {
	/** v-model */
	modelValue: false,
	/** 是否避免滚动穿透 */
	fixed: false,
	/** 自定义遮罩层的类名 */
	customClass: '',
	/** 内部的元素是否要水平垂直居中 */
	center: true,
	/** 点击遮罩层是否关闭 */
	closeOnClick: true,
});
const app = getCurrentInstance() as ComponentInternalInstance;

watch(
	() => props.modelValue,
	() => {
		fixedBody();
	},
	{ immediate: true },
);

/**
 * 解决滚动穿透
 */
function fixedBody() {
	if (props.modelValue) {
		if (props.fixed) {
			document.body.classList.add('v3-body--fixed');
		}
	} else {
		document.body.classList.remove('v3-body--fixed');
	}
}

function close() {
	if (app && props.closeOnClick) {
		app.emit('update:modelValue', false);
	}
}
</script>
<style lang="scss">
.v3-body--fixed {
	overflow: hidden;
}
</style>
<style lang="scss">
@import './Backdrop.scss';
</style>
