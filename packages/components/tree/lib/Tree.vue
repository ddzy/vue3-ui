<template>
	<div class="v3-tree"></div>
</template>
<script lang="tsx" setup>
import { ITreeProps } from '@typings/index';

defineOptions({
	name: 'V3Tree',
});

const props = withDefaults(defineProps<ITreeProps>(), {
	/**
	 * 树形数据源
	 */
	data: () => [],
	/**
	 * 唯一标识每个树节点
	 */
	nodeKey: undefined,
	/**
	 * 树为空时展示的文本
	 */
	emptyText: '暂无数据',
	/**
	 * 每个节点对应的data中的键
	 */
	props: undefined,
	/**
	 * 节点是否懒加载
	 */
	lazy: false,
	/**
	 * 节点懒加载数据的方法
	 */
	lazyMethod: undefined,
	/**
	 * 节点是否可选择
	 */
	selectable: false,
	/**
	 * 选中的节点是否高亮显示
	 */
	highlightSelectionNode: false,
	/**
	 * 在节点可选择的情况下，父子节点是否独立选择
	 */
	selectIsolate: false,
	/**
	 * 是否在点击节点任意区域后展开该节点
	 */
	expandOnClickNode: false,
	/**
	 * 是否在点击节点任意区域后选中该节点
	 */
	selectOnClickNode: false,
	/**
	 * 手风琴模式，即同级节点只显示一个
	 */
	accordion: false,
	/**
	 * 缩进的大小（单位为px）
	 */
	indent: 20,
	/**
	 * 节点是否可拖动
	 */
	draggable: false,
	/**
	 * 对于每个节点，判断是否可拖动
	 */
	allowDrag: undefined,
	/**
	 * 对于某个节点，判断是否可放置
	 */
	allowDrop: undefined,
});
</script>
<style lang="scss">
@import './Tree.scss';
</style>
