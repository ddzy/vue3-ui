<template>
	<div class="v3-tree">
		<RecursiveTree :children="nodes" />
	</div>
</template>
<script lang="tsx" setup>
import { reactive, ref, watch } from 'vue';
import { Fragment } from 'vue/jsx-runtime';

import { multiply } from '@common/utils';
import { V3Checkbox, V3Icon } from '@components/main';
import { ITreeData, ITreeNode, ITreeProp, ITreeProps } from '@typings/index';
import { cloneDeep, isFunction, isUndefined } from 'lodash-es';

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
	indent: 12,
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

const treeProps = reactive<Required<ITreeProp>>({
	key: 'key',
	label: 'label',
	children: 'children',
	...(props.props || {}),
});

/**
 * 树节点列表（根据data生成）
 */
const nodes = ref<ITreeNode[]>([]);
watch(
	() => props.data,
	(newValue) => {
		const clonedData = cloneDeep(newValue);
		function _recursive(data?: ITreeData[], parentNode?: ITreeNode) {
			if (Array.isArray(data) && data.length) {
				data.forEach((v) => {
					let key = v[treeProps.key];
					// nodeKey优先级高
					if (props.nodeKey) {
						if (isFunction(props.nodeKey)) {
							key = props.nodeKey({ data: v });
						} else {
							key = v[props.nodeKey];
						}
					}
					const hasChildren =
						Array.isArray(v[treeProps.children]) &&
						v[treeProps.children].length;
					const node: ITreeNode = {
						key,
						label: v[treeProps.label] || '',
						children: hasChildren ? [] : undefined,
						selected: false,
						loaded: false,
						expanded: false,
						disabled: false,
						parent: parentNode,
					};
					if (!parentNode) {
						nodes.value.push(node);
					} else {
						parentNode.children?.push(node);
					}
					if (hasChildren) {
						_recursive(v[treeProps.children], node);
					}
				});
			}
		}
		_recursive(clonedData);
	},
	{ immediate: true, deep: true },
);

function RecursiveTree(options: {
	parentLevel?: number;
	children?: ITreeNode[];
}): any {
	const level = isUndefined(options.parentLevel) ? 0 : options.parentLevel + 1;
	return (
		Array.isArray(options.children) &&
		options.children.length &&
		options.children.map((node) => {
			const hasChildren = Array.isArray(node.children) && node.children.length;
			return (
				<Fragment>
					<div class={['v3-tree__node']}>
						<div
							class="v3-tree__indent"
							style={{
								paddingLeft: `${multiply(props.indent, level)}px`,
							}}
						></div>
						<V3Icon type="Right" class="v3-tree__thumb"></V3Icon>
						<V3Checkbox class="v3-tree__checkbox"></V3Checkbox>
						<span class="v3-tree__label">{node.label}</span>
					</div>
					{hasChildren && (
						<RecursiveTree
							parentLevel={level}
							children={node.children}
						></RecursiveTree>
					)}
				</Fragment>
			);
		})
	);
}
</script>
<style lang="scss">
@import './Tree.scss';
</style>
