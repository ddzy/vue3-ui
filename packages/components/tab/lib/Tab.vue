<template>
	<div
		:class="{
			[`is-${props.type}`]: true,
			[`is-size-${props.size}`]: true,
			[`is-closable`]: props.closable,
			[`is-placement-${props.placement}`]: true,
			'has-header': props.showHeader,
		}"
		class="v3-tab"
	>
		<div v-if="showHeader" ref="tabHeaderRef" class="v3-tab__header">
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
								'is-disabled': v.props.disabled,
								[`show-close-${props.showClose}`]: true,
								index: i,
								[`name-${v.props.name}`]: true,
								[`index-${i}`]: true,
							}"
							:data-name="v.props.name"
							ref="tabNavItemRefs"
							class="v3-tab__nav-item"
							@click="
								props.trigger === 'click' &&
									!v.props.disabled &&
									toggleTab(v, i)
							"
							@mouseover="
								props.trigger === 'hover' &&
									!v.props.disabled &&
									toggleTab(v, i)
							"
						>
							<span>{{ v.props.title }}</span>
							<V3Icon
								v-if="
									props.closable && v.props.closable && props.type === 'card'
								"
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
import { nextTick, provide, reactive, ref, watch } from 'vue';

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

// 页签头部是否可以滚动，便于添加首尾阴影效果
const canTabNavScroll = ref<boolean>(false);
async function updateCanScroll() {
	if (tabNavWrapperRef.value) {
		if (['top', 'bottom'].includes(props.placement)) {
			canTabNavScroll.value =
				tabNavWrapperRef.value.scrollWidth > tabNavWrapperRef.value.clientWidth;
		} else {
			canTabNavScroll.value =
				tabNavWrapperRef.value.scrollHeight -
					tabNavWrapperRef.value.clientHeight >
				1;
		}
	}
}

provide(TAB_PROVIDE, {
	addTabPane,
	removeTabPane,
	updateTabHeight,
	updateTabLine,
	scrollIntoView,
	canTabNavScroll,
});

// 存储所有 TabPane 的数据，统一调度管理
const tabPanes = ref<ITabPaneProvide[]>([]);
function addTabPane(row: ITabPaneProvide) {
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
function removeTabPane(name: ITabModelValue) {
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
async function toggleTab(row: ITabPaneProvide, rowIndex: number) {
	model.value = row.props.name;
	await nextTick();
}
async function updateTabLine() {
	// 更新指示线的位置和大小
	const header = tabHeaderRef.value;
	const navItem = tabNavItemRefs.value.find((v) =>
		v.classList.contains('is-active'),
	);
	if (header && navItem) {
		const headerRect = useElementBounding(header);
		const navItemRect = useElementBounding(navItem);
		if (['top', 'bottom'].includes(props.placement)) {
			tabLineStyle.width = navItemRect.width.value || tabLineStyle.width;
			tabLineStyle.left = navItemRect.left.value - headerRect.left.value;
			tabLineStyle.height = 2;
			tabLineStyle.top =
				props.type === 'line' ? (props.placement === 'top' ? 1 : -1) : 0;
		} else if (['left', 'right'].includes(props.placement)) {
			tabLineStyle.height = navItemRect.height.value || tabLineStyle.height;
			tabLineStyle.top = navItemRect.top.value - headerRect.top.value;
			tabLineStyle.width = 2;
			tabLineStyle.left =
				props.type === 'line' ? (props.placement === 'left' ? 1 : -1) : 0;
		}
		await nextTick();
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
			}
		});
	},
	{ immediate: true },
);
useResizeObserver(tabHeaderRef, () => {
	updateTabLine();
	updateCanScroll();
});

const tabNavWrapperRef = ref<HTMLElement>(document.createElement('div'));
const tabNavListRef = ref<HTMLElement>();
const { arrivedState, x, y } = useScroll(tabNavWrapperRef, {
	throttle: 100,
	behavior: 'smooth',
	onScroll() {
		// 切换器列表滚动时，实时更新指示线
		updateTabLine();
		canTabNavScroll.value = true;
	},
});
// 页签切换器列表大小发生变化的时候
useResizeObserver(tabNavListRef, async () => {
	updateTabLine();
	updateCanScroll();
});

// 由于 TabPane 的高度可能不一致，所以切换tab时，动态更新容器的高度，避免闪动
const tabHeight = ref<number>(0);
function updateTabHeight(newTabHeight: number) {
	tabHeight.value = newTabHeight;
}

/**
 * 将当前活跃的切换器滚动到可视区域
 * @param name TabPane 的 name 属性
 */
async function scrollIntoView(name: ITabModelValue) {
	const navWrapper = tabNavWrapperRef.value;
	const navItem = tabNavItemRefs.value.find((v) => {
		return v.dataset.name == name;
	});
	if (navWrapper && navItem) {
		const navWrapperRect = useElementBounding(navWrapper);
		const navItemRect = useElementBounding(navItem);

		if (['top', 'bottom'].includes(props.placement)) {
			x.value =
				navItem.offsetLeft -
				navWrapperRect.width.value +
				(props.centeredHeader
					? navWrapperRect.width.value / 2 + navItemRect.width.value / 2
					: navItemRect.width.value + navItemRect.width.value / 2);
		} else {
			y.value =
				navItem.offsetHeight -
				navWrapperRect.height.value +
				(props.centeredHeader
					? navWrapperRect.height.value / 2 + navItemRect.height.value / 2
					: navItemRect.height.value + navItemRect.height.value / 2);
		}
	}
}

async function handleAdd() {
	emit('add');
	await nextTick();
}
function handleClose(row: ITabPaneProvide) {
	emit('close', row.props.name);
}
</script>
<style lang="scss">
@import './Tab.scss';
</style>
