<template>
	<transition name="v3-loading-fade" appear>
		<div
			v-if="isShow"
			:class="[
				'v3-loading',
				props.fullscreen ? 'is-fullscreen' : '',
				props.fixed ? 'is-fixed' : '',
				props.customClass,
			]"
			:id="`v3-loading-${app && app.uid}`"
			:style="{
				backgroundColor: props.backgroundColor,
				color: props.color,
				zIndex: VARIABLE.getNextZIndex(),
			}"
		>
			<div class="v3-loading__spinning">
				<V3Icon type="LoadingOne" spin />
			</div>

			<div class="v3-loading__content" v-if="props.content">
				<!-- 如果自定义内容为字符串 -->
				<span v-if="!isVNode(props.content)">
					{{ props.content }}
				</span>

				<!-- 如果自定义内容为 VNode -->
				<component v-else :is="h(props.content)" />
			</div>
		</div>
	</transition>
</template>
<script lang="ts" setup>
import { getCurrentInstance, h, isVNode, ref, watch } from 'vue';

import VARIABLE from '@common/constants/internal-variable';
import V3Icon from '@components/icon/main';
import { ILoadingProps } from '@typings/index';

defineOptions({
	name: 'V3Loading',
});
const props = withDefaults(defineProps<ILoadingProps>(), {
	/** 是否全屏显示 */
	fullscreen: false,
	/** 是否避免滚动穿透 */
	fixed: true,
	/** 自定义 loading 内容 */
	content: '',
	/** 自定义 loading 遮罩层的背景色 */
	backgroundColor: '',
	/** 自定义 loading 的文字颜色 */
	color: '',
	/** 自定义 loading 容器类名 */
	customClass: '',
});
const app = getCurrentInstance();

watch(
	() => props.fullscreen,
	() => {
		fixedBody();
	},
	{ immediate: true },
);

const isShow = ref(true);
function close() {
	isShow.value = false;
}
function open() {
	isShow.value = true;
}

/**
 * 解决滚动穿透
 */
function fixedBody() {
	if (props.fullscreen) {
		if (props.fixed) {
			document.body.classList.add('v3-body--fixed');
		}
	} else {
		document.body.classList.remove('v3-body--fixed');
	}
}

defineExpose({
	close,
	open,
});
</script>
<style lang="scss">
.v3-body--fixed {
	overflow: hidden;
}
.v3-loading-parent--relative {
	position: relative !important;
}
</style>

<style lang="scss">
@import './Loading.scss';
</style>
