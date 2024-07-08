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
				'can-trigger': collapse?.props.triggerArea?.includes('space'),
			}"
			class="v3-collapse-item__header"
			@click="handleHeaderClick"
		>
			<ReusableIcon v-if="collapse?.props.arrowPlacement === 'start'" />
			<div
				:class="{
					'can-trigger': collapse?.props.triggerArea?.includes('title'),
				}"
				ref="headerTitleRef"
				class="v3-collapse-item__title"
			>
				<span>{{ props.title }}</span>
			</div>
			<div
				:class="{
					'can-trigger': collapse?.props.triggerArea?.includes('extra'),
				}"
				ref="headerExtraRef"
				class="v3-collapse-item__extra"
			>
				<slot name="extra"></slot>
			</div>
			<ReusableIcon v-if="collapse?.props.arrowPlacement === 'end'" />
		</div>
		<ReusableBody />
	</div>
</template>
<script lang="tsx" setup>
import {
	Transition,
	computed,
	getCurrentInstance,
	inject,
	onMounted,
	ref,
	useSlots,
} from 'vue';

import { COLLAPSE_PROVIDE } from '@common/constants/provide-symbol';
import { handleTransitionEnter, handleTransitionLeave } from '@common/utils';
import { ICollapseItemProps, ICollapseProvide } from '@typings/index';

defineOptions({
	name: 'V3CollapseItem',
});

const props = withDefaults(defineProps<ICollapseItemProps>(), {
	/** 唯一标识，默认为当前组件的 uid */
	name: getCurrentInstance()?.uid,
	/** 标题，默认为当前组件的 uid */
	title: `${getCurrentInstance()?.uid}`,
	/** 是否禁用 */
	disabled: false,
	/** 显示策略（v-if/v-show），如果值为 undefined，那么使用 Collapse 的对应值 */
	displayStrategy: undefined,
});
const slots = useSlots();
const computedDisplayStrategy = computed(() => {
	return props.displayStrategy || collapse?.props.displayStrategy;
});

// 当前面板是否展开
const active = ref(false);
function updateActive(newActive: boolean) {
	active.value = newActive;
}

const collapse = inject<ICollapseProvide>(COLLAPSE_PROVIDE);
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
function handleAfterEnter(el: Element) {
	const element = el as HTMLElement;
	element.style.cssText += `height: auto`;
}
function handleBeforeLeave(el: Element) {
	const element = el as HTMLElement;
	const { height } = element.getBoundingClientRect();
	element.style.cssText += `height: ${height}px`;
}
function handleAfterLeave() {
	showHeaderBorder.value = false;
}

// 判断可点击切换的区域
const headerIconRef = ref<HTMLElement>(document.createElement('div'));
const headerTitleRef = ref<HTMLElement>(document.createElement('div'));
const headerExtraRef = ref<HTMLElement>(document.createElement('div'));
function handleHeaderClick(e: Event) {
	if (collapse) {
		const event = e as MouseEvent;
		const path = event.composedPath();
		const canIconTrigger = collapse.props.triggerArea?.includes('icon');
		const canTitleTrigger = collapse.props.triggerArea?.includes('title');
		const canExtraTrigger = collapse.props.triggerArea?.includes('extra');
		const canSpaceTrigger = collapse.props.triggerArea?.includes('space');

		function next() {
			collapse?.toggleCollapseItem(props.name, !active.value);
		}

		if (canIconTrigger && path.includes(headerIconRef.value)) {
			next();
		} else if (canTitleTrigger && path.includes(headerTitleRef.value)) {
			next();
		} else if (canExtraTrigger && path.includes(headerExtraRef.value)) {
			next();
		} else if (
			canSpaceTrigger &&
			!path.includes(headerIconRef.value) &&
			!path.includes(headerTitleRef.value) &&
			!path.includes(headerExtraRef.value)
		) {
			next();
		}
	}
}

function ReusableIcon() {
	return (
		<div
			class={{
				'can-trigger': collapse?.props.triggerArea?.includes('icon'),
				'v3-collapse-item__icon': true,
			}}
			ref="headerIconRef"
		>
			<v3-icon type={'Right'}></v3-icon>
		</div>
	);
}
function ReusableBody() {
	return (
		<Transition
			onEnter={handleEnter}
			onLeave={handleLeave}
			onBeforeLeave={handleBeforeLeave}
			onBeforeEnter={handleBeforeEnter}
			onAfterLeave={handleAfterLeave}
			onAfterEnter={handleAfterEnter}
		>
			{computedDisplayStrategy.value === 'show' ? (
				<div v-show={active.value} class="v3-collapse-item__body">
					<div class="v3-collapse-item__body-inner">{slots?.default?.()}</div>
				</div>
			) : active.value ? (
				<div class="v3-collapse-item__body">
					<div class="v3-collapse-item__body-inner">{slots?.default?.()}</div>
				</div>
			) : (
				<template></template>
			)}
		</Transition>
	);
}
</script>
<style lang="scss">
@import './CollapseItem.scss';
</style>
