<template>
	<transition
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
import { inject, nextTick, onBeforeUnmount, readonly, ref, watch } from 'vue';

import { TAB_PROVIDE } from '@common/constants/provide-symbol';
import { ITabPaneProps, ITabProvide } from '@typings/index';

defineOptions({
	name: 'V3TabPane',
});

const props = withDefaults(defineProps<ITabPaneProps>(), {
	/** 页签的唯一标识名称 */
	name: 0,
	/** 页签的标题 */
	title: '',
	/** 是否禁用当前页签 */
	disabled: false,
	/** 当前页签是否可关闭 */
	closable: true,
});
const tab = inject<ITabProvide>(TAB_PROVIDE);

const active = ref<boolean>(false);
function updateActive(newActive: boolean) {
	active.value = newActive;
}

watch(
	props,
	async () => {
		// 将当前 TabPane 的数据存储到 Tab 中，统一调度
		if (tab) {
			tab.addTabPane({
				props: readonly(props),
				updateActive,
			});
		}
	},
	{ immediate: true },
);

watch(
	active,
	async (newValue) => {
		// 如果当前 TabPane 为显示状态，那么同步更新指示线的位置大小
		if (newValue && tab) {
			await nextTick();
			tab.updateTabLine();
			tab.scrollIntoView(props.name);
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

onBeforeUnmount(async () => {
	// 当前 TabPane 隐藏时，从 Tab 中移除该 TabPane 的数据
	if (tab) {
		tab.removeTabPane(props.name);
	}
});
</script>
<style lang="scss" scoped>
@import './TabPane.scss';
</style>
