<template>
	<div :class="['v3-tree', props.block && 'is-block']">
		<RecursiveTree :children="nodes" />
	</div>
</template>
<script lang="tsx" setup>
import { Fragment, Transition, h, reactive, ref, watch } from 'vue';

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
	 * 聚焦的节点是否高亮显示
	 */
	highlightFocusedNode: true,
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
	 * 节点宽度是否撑开
	 */
	block: false,
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
/**
 * 根据传入的data，递归生成树形节点
 * @param data 树形数据源
 * @param parentNode 父节点
 */
function transformData2Node(data?: ITreeData[], parentNode?: ITreeNode) {
	data = cloneDeep(data);
	const result: ITreeNode[] = [];
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
					Array.isArray(v[treeProps.children]) && v[treeProps.children].length;
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
					loading: false,
					expanded,
					disabled: false,
					data: v,
					parent: parentNode,
				};
				if (!parentNode) {
					result.push(node);
				} else {
					if (!Array.isArray(parentNode.children)) {
						parentNode.children = [];
					}
					parentNode.children.push(node);
				}
				if (hasChildren) {
					_recursive(v[treeProps.children], node);
				}
			});
		}
	}
	_recursive(data, parentNode);

	return result;
}
watch(
	() => props.data,
	(newValue) => {
		nodes.value = transformData2Node(newValue);
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

/**
 * 当前聚焦的树节点
 */
const focusedNode = ref<ITreeNode>();

function handleNodeClick(
	node: ITreeNode,
	data: ITreeData,
	forceExpand = false,
): void {
	if (props.highlightFocusedNode) {
		focusedNode.value = node;
	}
	const expand = forceExpand || props.expandOnClickNode;
	// 树形数据懒加载
	if (props.lazy && !node.loaded && expand) {
		node.loading = true;
		if (props.lazyMethod) {
			props.lazyMethod({
				node,
				data,
				resolve(newData) {
					transformData2Node(newData, node);
					node.loading = false;
					node.loaded = true;
					node.expanded = !node.expanded;
				},
			});
		}
	} else {
		if (expand) {
			node.expanded = !node.expanded;
		}
	}
}

function handleNodeThumbClick(node: ITreeNode, data: ITreeData) {
	if (!props.expandOnClickNode) {
		handleNodeClick(node, data, true);
	}
}

function RecursiveTree(options: {
	parentLevel?: number;
	children?: ITreeNode[];
}): any {
	const level = isUndefined(options.parentLevel) ? 0 : options.parentLevel + 1;

	return Array.isArray(options.children) && options.children.length ? (
		options.children.map((node) => {
			const hasChildren = Array.isArray(node.children) && node.children.length;
			const showThumb = hasChildren || (!node.loaded && props.lazy);
			return (
				<div
					class={[
						'v3-tree-node',
						node.expanded && 'is-expanded',
						focusedNode.value === node && 'is-focused',
					]}
				>
					<div
						class="v3-tree-node__content"
						onClick={() => handleNodeClick(node, node.data)}
					>
						{/* 树节点缩进 */}
						<div
							class="v3-tree-node__indent"
							style={{
								paddingLeft: `calc(${add(multiply(props.indent, level))}px + ${showThumb ? 0 : 1}em)`,
							}}
						></div>
						{/* 切换图标 */}
						{showThumb ? (
							h(V3Icon, {
								type: props.lazy && node.loading ? 'LoadingOne' : 'Right',
								spin: props.lazy && node.loading,
								class: 'v3-tree-node__thumb',
								onClick: () => handleNodeThumbClick(node, node.data),
							})
						) : (
							<Fragment></Fragment>
						)}
						{/* 复选框 */}
						{props.selectable ? (
							<V3Checkbox class="v3-tree-node__checkbox"></V3Checkbox>
						) : (
							<Fragment></Fragment>
						)}
						<span class="v3-tree-node__label">{node.label}</span>
					</div>
					{hasChildren ? (
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
					) : (
						<Fragment></Fragment>
					)}
				</div>
			);
		})
	) : (
		<Fragment></Fragment>
	);
}
</script>
<style lang="scss">
@import './Tree.scss';
</style>
