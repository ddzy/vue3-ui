<template>
	<div
		:class="{
			'is-plain': props.plain,
		}"
		class="v3-collapse"
	>
		<slot></slot>
	</div>
</template>
<script lang="ts" setup>
import { nextTick, provide, ref, watch } from 'vue';

import { COLLAPSE_PROVIDE } from '@common/constants/provide-symbol';
import { isUndefined } from '@common/utils';

import {
	ICollapseItemName,
	ICollapseItemProvide,
	ICollapseModelValue,
	ICollapseProps,
	ICollapseProvide,
} from '@/public/typings/index';

defineOptions({
	name: 'V3Collapse',
});

const props = withDefaults(defineProps<ICollapseProps>(), {
	/** v-model 绑定值（当绑定一个非数组值时，效果同`accordion`手风琴模式 */
	modelValue: () => [],
	/** 手风琴模式 */
	accordion: false,
	/** 简约模式 */
	plain: false,
	/** CollapseItem 显示策略 */
	displayStrategy: 'if',
	/** 箭头的位置 */
	arrowPlacement: 'start',
	/** 可点击切换的区域 */
	triggerArea: () => ['icon', 'title', 'extra'],
});

provide<ICollapseProvide>(COLLAPSE_PROVIDE, {
	props,
	addCollapseItem,
	toggleCollapseItem,
});

const collapseItems = ref<ICollapseItemProvide[]>([]);
/**
 * CollapseItem 挂载后将自身的数据存到 Collapse，统一调度
 * @param row CollapseItem
 */
function addCollapseItem(row: ICollapseItemProvide) {
	const foundIndex = collapseItems.value.findIndex(
		(v) => v.props.name === row.props.name,
	);
	if (foundIndex === -1) {
		collapseItems.value.push(row);
	} else {
		collapseItems.value[foundIndex] = row;
	}
}
/**
 * 切换 CollapseItem 时，更新 v-model
 * @param name CollapseItem 的 name 属性
 * @param active 是否展开
 */
function toggleCollapseItem(name: ICollapseItemName, active: boolean) {
	if (Array.isArray(model.value)) {
		if (active) {
			if (props.accordion) {
				// @ts-ignore
				model.value = [name];
			} else {
				// @ts-ignore
				model.value = model.value.concat(name);
			}
		} else {
			if (props.accordion) {
				model.value = [];
			} else {
				// @ts-ignore
				model.value = model.value.filter((v) => v !== name);
			}
		}
	} else if (!isUndefined(model.value)) {
		if (active) {
			model.value = name;
		} else {
			// @ts-ignore
			model.value = undefined;
		}
	}
}

const model = defineModel<ICollapseModelValue>({
	default: () => [],
});
watch(
	model,
	async (newValue) => {
		// v-model 绑定值发生变化，将对应的 CollapseItem 折叠或展开
		await nextTick();
		if (Array.isArray(newValue)) {
			collapseItems.value.forEach((v) => {
				// @ts-ignore
				v.updateActive(newValue.includes(v.props.name));
			});
		} else if (!isUndefined(newValue)) {
			collapseItems.value.forEach((v) => {
				v.updateActive(v.props.name === newValue);
			});
		}
	},
	{ immediate: true },
);
</script>
<style lang="scss">
@import './Collapse.scss';
</style>
