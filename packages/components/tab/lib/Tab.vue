<template>
	<div
		:class="{
			[`is-${props.type}`]: true,
			[`is-closable`]: props.closable,
		}"
		class="v3-tab"
	>
		<div ref="tabHeaderRef" class="v3-tab__header">
			<ul class="v3-tab__nav">
				<li
					v-for="v in tabPanes"
					:key="v.props.name"
					:class="{
						'is-active': v.props.name === model,
						[`show-close-${props.showClose}`]: true,
					}"
					ref="tabNavRefs"
					class="v3-tab__nav-item"
					@click="props.trigger === 'click' && toggleTab(v)"
					@mouseover="props.trigger === 'hover' && toggleTab(v)"
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
			<div
				v-if="props.type !== 'card'"
				:style="{
					width: `${tabLineStyle.width}px`,
					left: `${tabLineStyle.left}px`,
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
				height: `${tabHeight}px`,
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
	showClose: 'active',
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
});
const tabHeaderRef = ref<HTMLElement>();
const tabNavRefs = ref<HTMLElement[]>([]);
function toggleTab(row: ITabPaneProvide) {
	model.value = row.props.name;
}
function updateTabLine() {
	// 更新指示线的位置和大小
	const header = tabHeaderRef.value;
	const nav = tabNavRefs.value.find((v) => v.classList.contains('is-active'));
	if (header && nav) {
		const headerRect = useElementBounding(header);
		const navRect = useElementBounding(nav);
		tabLineStyle.width = navRect.width.value || tabLineStyle.width;
		tabLineStyle.left = navRect.left.value - headerRect.left.value;
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