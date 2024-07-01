<template>
	<transition
		:css="false"
		@before-enter="handleBeforeEnter"
		@after-leave="handleBeforeEnter"
		@enter="handleEnter"
		@leave="handleLeave"
		@after-enter="handleAfterEnter"
		@before-leave="handleAfterEnter"
	>
		<div v-if="active" class="v3-tab-pane">
			<slot></slot>
		</div>
	</transition>
</template>
<script lang="ts" setup>
import { inject } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';
import { readonly } from 'vue';

import { TAB_PROVIDE } from '@common/constants/provide-symbol';
import { ITabPaneProps, ITabPaneProvide, ITabProvide } from '@typings/index';

defineOptions({
	name: 'V3TabPane',
});

const props = withDefaults(defineProps<ITabPaneProps>(), {
	/** 页签的唯一标识名称 */
	name: 0,
	/** 页签的标题 */
	title: '0',
	/** 是否禁用当前页签 */
	disabled: false,
	/** 当前页签是否可关闭 */
	closable: true,
});

// 将当前 tab-pane 的参数注入到 tab 中统一调度
const active = ref<boolean>(false);
function updateActive(newActive: boolean) {
	active.value = newActive;
}

const tab = inject<ITabProvide>(TAB_PROVIDE);
watch(
	props,
	() => {
		if (tab) {
			tab.updateTabPanes({
				props: readonly(props),
				updateActive,
			});
		}
	},
	{ immediate: true },
);

function handleBeforeEnter(el: Element) {
	const _el = el as HTMLElement;
	_el.style.cssText += `opacity: 0; transform: translateX(20px);`;
}
function handleEnter(el: Element, done: Function) {
	const _el = el as HTMLElement;
	_el.style.cssText += `transition: all 0.3s ease;`;
	if (tab) {
		tab.updateTabHeight(_el.offsetHeight);
		done();
	}
}
function handleLeave(el: Element, done: Function) {
	const _el = el as HTMLElement;
	_el.style.cssText += `transition: all 0s ease;`;
	if (tab) {
		tab.updateTabHeight(0);
		done();
	}
}
function handleAfterEnter(el: Element) {
	const _el = el as HTMLElement;
	_el.style.cssText += `opacity: 1; transform: translateX(0);`;
}
</script>
<style lang="scss" scoped>
@import './TabPane.scss';
</style>
