<template>
	<div class="v3-tree">
		<RecursiveTree :children="nodes" />
	</div>
</template>
<script lang="tsx" setup>
import { Transition, reactive, ref, watch } from 'vue';

import {
	add,
	handleTransitionEnter,
	handleTransitionLeave,
	multiply,
} from '@common/utils';
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
	expandOnClickNode: true,
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
	 * 所有节点是否默认展开
	 */
	defaultExpandAll: false,
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
					const expanded = !isUndefined(props.defaultExpandAll)
						? props.defaultExpandAll
						: !isUndefined(parentNode?.expanded)
							? parentNode.expanded
							: false;

					const node: ITreeNode = {
						key,
						label: v[treeProps.label] || '',
						children: hasChildren ? [] : undefined,
						selected: false,
						loaded: false,
						expanded,
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

function handleEnter(el: Element) {
	const element = el as HTMLElement;
	handleTransitionEnter(element);
}
function handleLeave(el: Element) {
	const element = el as HTMLElement;
	handleTransitionLeave(element);
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

function handleNodeClick(node: ITreeNode): void {
	if (props.expandOnClickNode) {
		node.expanded = !node.expanded;
	}
}

function handleNodeThumbClick(node: ITreeNode) {
	if (!props.expandOnClickNode) {
		node.expanded = !node.expanded;
	}
}

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
				<div class={['v3-tree-node', node.expanded && 'is-expanded']}>
					<div
						class="v3-tree-node__content"
						onClick={() => handleNodeClick(node)}
					>
						{/* 树节点缩进 */}
						<div
							class="v3-tree-node__indent"
							style={{
								paddingLeft: `calc(${add(multiply(props.indent, level))}px + ${hasChildren ? 0 : 1}em)`,
							}}
						></div>
						{/* 切换图标 */}
						{hasChildren && (
							<V3Icon
								type="Right"
								class="v3-tree-node__thumb"
								onClick={() => handleNodeThumbClick(node)}
							></V3Icon>
						)}
						{/* 复选框 */}
						{props.selectable && (
							<V3Checkbox class="v3-tree-node__checkbox"></V3Checkbox>
						)}
						<span class="v3-tree-node__label">{node.label}</span>
					</div>
					{hasChildren && (
						<Transition
							onEnter={handleEnter}
							onLeave={handleLeave}
							onBeforeLeave={handleBeforeLeave}
							onAfterEnter={handleAfterEnter}
						>
							<div v-show={node.expanded} class="v3-tree-node__children">
								<RecursiveTree
									children={node.children}
									parentLevel={level}
								></RecursiveTree>
							</div>
						</Transition>
					)}
				</div>
			);
		})
	);
}
</script>
<style lang="scss">
@import './Tree.scss';
</style>
