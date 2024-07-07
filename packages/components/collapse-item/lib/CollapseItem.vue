<template>
	<div
		:class="{
			'is-active': active,
		}"
		class="v3-collapse-item"
	>
		<div
			:class="{
				'show-border': showHeaderBorder,
			}"
			class="v3-collapse-item__header"
			@click="computedIsEntireArea && updateActive(!active)"
		>
			<v3-icon
				type="Right"
				class="v3-collapse-item__icon"
				@click="
					(computedIsEntireArea ||
						collapse?.props.triggerArea?.includes('icon')) &&
						updateActive(!active)
				"
			></v3-icon>
			<div
				class="v3-collapse-item__title"
				@click="
					(computedIsEntireArea ||
						collapse?.props.triggerArea?.includes('title')) &&
						updateActive(!active)
				"
			>
				<span>{{ props.title }}</span>
			</div>
			<div
				class="v3-collapse-item__extra"
				@click="
					(computedIsEntireArea ||
						collapse?.props.triggerArea?.includes('extra')) &&
						updateActive(!active)
				"
			></div>
		</div>
		<template v-if="props.displayStrategy === 'if'">
			<transition
				@enter="handleEnter"
				@leave="handleLeave"
				@before-enter="handleBeforeEnter"
				@after-leave="handleAfterLeave"
			>
				<div v-if="active" class="v3-collapse-item__body">
					<div class="v3-collapse-item__body-inner">
						<slot></slot>
					</div>
				</div>
			</transition>
		</template>
		<template v-else-if="props.displayStrategy === 'show'">
			<transition
				@enter="handleEnter"
				@leave="handleLeave"
				@before-enter="handleBeforeEnter"
				@after-leave="handleAfterLeave"
			>
				<div v-show="active" class="v3-collapse-item__body">
					<div class="v3-collapse-item__body-inner">
						<slot></slot>
					</div>
				</div>
			</transition>
		</template>
	</div>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue';

import { COLLAPSE_PROVIDE } from '@common/constants/provide-symbol';
import { handleTransitionEnter, handleTransitionLeave } from '@common/utils';
import { ICollapseItemProps, ICollapseProvide } from '@typings/index';

defineOptions({
	name: 'V3CollapseItem',
});

const props = withDefaults(defineProps<ICollapseItemProps>(), {
	name: getCurrentInstance()?.uid,
	title: `${getCurrentInstance()?.uid}`,
	disabled: false,
	displayStrategy: 'if',
});
const collapse = inject<ICollapseProvide>(COLLAPSE_PROVIDE);

const active = ref(false);
function updateActive(newActive: boolean) {
	active.value = newActive;
}

const computedIsEntireArea = computed(() => {
	return collapse
		? collapse.props.triggerArea?.sort().join(',') === 'extra,icon,title'
		: true;
});

// 页面挂载后，将当前 CollapseItem 交给 Collapse 统一调度
onMounted(() => {
	if (collapse) {
		collapse.addCollapseItem({
			props,
			updateActive,
		});
	}
});

// 是否显示 header 区域的 border，折叠框展开前显示，折叠后隐藏
const showHeaderBorder = ref(active.value);
function handleEnter(el: Element) {
	const element = el as HTMLElement;
	handleTransitionEnter(element);
}
function handleLeave(el: Element) {
	const element = el as HTMLElement;
	handleTransitionLeave(element);
}
function handleBeforeEnter() {
	showHeaderBorder.value = true;
}
function handleAfterLeave() {
	showHeaderBorder.value = false;
}
</script>
<style lang="scss">
@import './CollapseItem.scss';
</style>
