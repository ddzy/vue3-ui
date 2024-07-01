<template>
	<div
		:class="{
			[`is-type-${props.type}`]: true,
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
					}"
					ref="tabNavRefs"
					class="v3-tab__nav-item"
					@click="toggleTab(v)"
				>
					{{ v.props.title }}
				</li>
			</ul>
			<div
				:style="{
					width: `${tabLineStyle.width}px`,
					left: `${tabLineStyle.left}px`,
				}"
				class="v3-tab__line"
			></div>
			<div v-if="props.type === 'line'" class="v3-tab__track"></div>
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
import { DeepReadonly, reactive, useSlots } from 'vue';
import { ref } from 'vue';
import { provide } from 'vue';
import { watch } from 'vue';
import { Ref } from 'vue';
import { nextTick } from 'vue';

import { TAB_PROVIDE } from '@common/constants/provide-symbol';
import useElementBounding from '@hooks/useElementBounding';
import { ITabModelValue, ITabPaneProvide, ITabProps } from '@typings/index';

defineOptions({
	name: 'V3Tab',
});

const props = withDefaults(defineProps<ITabProps>(), {
	/** 页签类型 */
	type: 'bar',
	/** 是否可动态增加页签 */
	addable: true,
	/** 是否可关闭页签 */
	closable: true,
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
const model = defineModel<ITabModelValue>();

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
provide(TAB_PROVIDE, {
	updateTabPanes,
	updateTabHeight,
});

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

// 由于 TabPane 的高度可能不一致，所以动态更新容器的高度，避免闪动
const tabHeight = ref<number>(0);
function updateTabHeight(newTabHeight: number) {
	tabHeight.value = newTabHeight;
}
</script>
<style lang="scss">
@import './Tab.scss';
</style>
