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
import { provide, ref } from 'vue';

import { COLLAPSE_PROVIDE } from '@common/constants/provide-symbol';

import {
	ICollapseItemProvide,
	ICollapseProps,
	ICollapseProvide,
} from '@/public/typings/index';

defineOptions({
	name: 'V3Collapse',
});

const props = withDefaults(defineProps<ICollapseProps>(), {
	modelValue: () => [],
	accordion: false,
	plain: false,
	displayStrategy: 'if',
	arrowPlacement: 'start',
	triggerArea: () => ['icon', 'title', 'extra'],
});

provide<ICollapseProvide>(COLLAPSE_PROVIDE, {
	props,
	addCollapseItem,
});

// 存储所有的 CollapseItem，统一调度
const collapseItems = ref<ICollapseItemProvide[]>([]);
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
</script>
<style lang="scss">
@import './Collapse.scss';
</style>
