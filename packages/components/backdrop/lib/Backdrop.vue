<template>
	<teleport to="body">
		<transition name="v3-backdrop-fade">
			<div
				v-show="model"
				ref="wrapperRef"
				class="v3-backdrop"
				:id="`v3-backdrop-${app.uid}`"
				:style="{
					zIndex: VARIABLE.getNextZIndex(),
				}"
				:class="`${props.customClass} ${props.center ? 'is-center' : ''}`"
				@click.self="close"
			>
				<slot></slot>
			</div>
		</transition>
	</teleport>
</template>
<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, ref, watch } from 'vue';

import VARIABLE from '@common/constants/internal-variable';
import type { IBackdropProps } from '@typings/index';

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
const emit = defineEmits<{
	(e: 'update:modelValue', v: boolean): void;
	(e: 'close'): void;
}>();
const app = getCurrentInstance() as ComponentInternalInstance;
const model = defineModel();

const wrapperRef = ref();

watch(
	model,
	() => {
		fixedBody();
	},
	{ immediate: true },
);

/**
 * 解决滚动穿透
 */
function fixedBody() {
	if (model.value) {
		if (props.fixed) {
			document.body.classList.add('v3-body--fixed');
		}
	} else {
		document.body.classList.remove('v3-body--fixed');
	}
}

function close() {
	if (props.closeOnClick) {
		model.value = false;
	}
	emit('close');
}

defineExpose({
	wrapperRef,
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
