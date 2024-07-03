<template>
	<div
		:class="{
			[`is-${props.type}`]: true,
			[`is-closable`]: props.closable,
			[`is-placement-${props.placement}`]: true,
		}"
		class="v3-tab"
	>
		<div ref="tabHeaderRef" class="v3-tab__header">
			<div class="v3-tab__nav">
				<div
					:class="{
						'can-scroll': canTabNavScroll,
						'is-arrived-left': arrivedState.left,
						'is-arrived-right': arrivedState.right,
						'is-arrived-top': arrivedState.top,
						'is-arrived-bottom': arrivedState.bottom,
					}"
					ref="tabNavWrapperRef"
					class="v3-tab__nav-inner"
				>
					<ul ref="tabNavListRef" class="v3-tab__nav-list">
						<li
							v-for="(v, i) in tabPanes"
							:key="v.props.name"
							:class="{
								'is-active': v.props.name === model,
								[`show-close-${props.showClose}`]: true,
							}"
							ref="tabNavItemRefs"
							class="v3-tab__nav-item"
							@click="props.trigger === 'click' && toggleTab(v, i)"
							@mouseover="props.trigger === 'hover' && toggleTab(v, i)"
						>
							<span>{{ v.props.title }}</span>
							<V3Icon
								v-if="props.closable && props.type === 'card'"
								class="v3-tab__nav-close"
								type="CloseSmall"
								@click.stop="handleClose(v)"
							/>
						</li>
					</ul>
				</div>
			</div>
			<div
				v-if="props.type !== 'card'"
				:style="{
					width: `${tabLineStyle.width}px`,
					left: `${tabLineStyle.left}px`,
					height: `${tabLineStyle.height}px`,
					top: `${tabLineStyle.top}px`,
				}"
				class="v3-tab__line"
			></div>
			<div v-if="props.type === 'line'" class="v3-tab__track"></div>
			<div
				v-if="props.addable && props.type === 'card'"
				class="v3-tab__add"
				@click="handleAdd"
			>
				<V3Icon type="Plus" />
			</div>
		</div>
		<div
			:style="{
				height: ['top', 'bottom'].includes(props.placement)
					? `${tabHeight}px`
					: 'auto',
			}"
			class="v3-tab__body"
		>
			<slot></slot>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { ref } from 'vue';
import { provide } from 'vue';
import { watch } from 'vue';
import { nextTick } from 'vue';

import { TAB_PROVIDE } from '@common/constants/provide-symbol';
import V3Icon from '@components/icon/main';
import useElementBounding from '@hooks/useElementBounding';
import useResizeObserver from '@hooks/useResizeObserver';
import { ITabModelValue, ITabPaneProvide, ITabProps } from '@typings/index';
import { useScroll } from '@vueuse/core';

defineOptions({
	name: 'V3Tab',
});

const props = withDefaults(defineProps<ITabProps>(), {
	/** 页签类型 */
	type: 'bar',
	/** 是否可动态增加页签 */
	addable: false,
	/** 是否可关闭页签 */
	closable: false,
	/** 显示关闭按钮的时机 */
	showClose: 'always',
	/** 页签大小 */
	size: 'medium',
	/** 切换页签的方式 */
	trigger: 'click',
	/** 页签切换器的位置 */
	placement: 'top',
	/** 是否显示页签切换器 */
	showHeader: true,
	/** 当前活跃的页签切换器项是否始终保持居中 */
	centeredHeader: true,
});
const emit = defineEmits<{
	(e: 'update:modelValue', v: ITabModelValue): void;
	(e: 'add'): void;
	(e: 'close', v: ITabModelValue): void;
}>();
const model = defineModel<ITabModelValue>();

provide(TAB_PROVIDE, {
	updateTabPanes,
	updateTabHeight,
	removeTabPanes,
});

// 存储所有 TabPane 的数据，统一调度管理
const tabPanes = ref<ITabPaneProvide[]>([]);
function updateTabPanes(row: ITabPaneProvide) {
	// 默认选中第一个
	if (typeof model.value === 'undefined') {
		model.value = row.props.name;
	}
	let found = tabPanes.value.find((v) => v.props.name === row.props.name);
	if (!found) {
		tabPanes.value = tabPanes.value.concat(row);
	} else {
		tabPanes.value = tabPanes.value.map((v) => {
			return v.props.name === row.props.name ? row : v;
		});
	}
}
// 移除某个 TabPane
function removeTabPanes(name: ITabModelValue) {
	tabPanes.value = tabPanes.value.filter((v) => v.props.name !== name);
}

const tabLineStyle = reactive({
	left: 0,
	width: 0,
	top: 0,
	height: 0,
});
const tabHeaderRef = ref<HTMLElement>();
const tabNavItemRefs = ref<HTMLElement[]>([]);
function toggleTab(row: ITabPaneProvide, rowIndex: number) {
	model.value = row.props.name;
}
async function updateTabLine() {
	// 更新指示线的位置和大小
	const header = tabHeaderRef.value;
	const nav = tabNavItemRefs.value.find((v) =>
		v.classList.contains('is-active'),
	);
	if (header && nav) {
		const headerRect = useElementBounding(header);
		const navRect = useElementBounding(nav);
		if (['top', 'bottom'].includes(props.placement)) {
			tabLineStyle.width = navRect.width.value || tabLineStyle.width;
			tabLineStyle.left = navRect.left.value - headerRect.left.value;
			tabLineStyle.height = 2;
			tabLineStyle.top = 0;
		} else if (['left', 'right'].includes(props.placement)) {
			tabLineStyle.height = navRect.height.value || tabLineStyle.height;
			tabLineStyle.top = navRect.top.value - headerRect.top.value;
			tabLineStyle.width = 2;
			tabLineStyle.left = 0;
		}
		await nextTick();
		// 将当前活跃的tab切换器滚动到可视区域
		nav.scrollIntoView({
			behavior: 'smooth',
			inline: props.centeredHeader ? 'center' : 'nearest',
			block: 'nearest',
		});
	}
}
watch(
	model,
	async (newValue) => {
		await nextTick();
		tabPanes.value.forEach(async (v) => {
			v.updateActive(false);
			if (v.props.name === newValue) {
				v.updateActive(true);
				updateTabLine();
			}
		});
	},
	{ immediate: true },
);
useResizeObserver(tabHeaderRef, () => {
	updateTabLine();
	updateCanScroll();
});
watch(props, async () => {
	await nextTick();
	updateTabLine();
});

// 由于 TabPane 的高度可能不一致，所以动态更新容器的高度，避免闪动
const tabHeight = ref<number>(0);
function updateTabHeight(newTabHeight: number) {
	tabHeight.value = newTabHeight;
}

// 页签头部是否可以滚动，便于添加首尾阴影效果
const canTabNavScroll = ref<boolean>(false);
function updateCanScroll() {
	if (tabNavWrapperRef.value) {
		canTabNavScroll.value =
			tabNavWrapperRef.value.scrollWidth !== tabNavWrapperRef.value.offsetWidth;
	}
}

const tabNavWrapperRef = ref<HTMLElement>();
const tabNavListRef = ref<HTMLElement>();
const { arrivedState } = useScroll(tabNavWrapperRef);
// 页签切换器列表大小（个数）发生变化的时候
useResizeObserver(tabNavListRef, () => {
	updateCanScroll();
});

function handleAdd() {
	emit('add');
}
function handleClose(row: ITabPaneProvide) {
	emit('close', row.props.name);
}
</script>
<style lang="scss">
@import './Tab.scss';
</style>
