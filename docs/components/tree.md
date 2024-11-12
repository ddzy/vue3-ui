# Tree 树形控件

## 基本用法

:::demo

```vue
<template>
	<v3-tree :data="data"></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		key: '1',
		label: '1',
		children: [
			{
				key: '1-1',
				label: '1-1',
				children: [
					{
						key: '1-1-1',
						label: '1-1-1',
					},
				],
			},
			{
				key: '1-2',
				label: '1-2',
			},
		],
	},
	{
		key: '2',
		label: '2',
	},
]);
</script>
```

:::

## 自定义属性

:::demo

```vue
<template>
	<v3-tree
		:data="data"
		:props="{
			key: '_id',
			label: 'name',
		}"
	></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		_id: '1',
		name: '1',
		children: [
			{
				_id: '1-1',
				name: '1-1',
				children: [
					{
						_id: '1-1-1',
						name: '1-1-1',
					},
				],
			},
			{
				_id: '1-2',
				name: '1-2',
			},
		],
	},
	{
		_id: '2',
		name: '2',
	},
]);
</script>
```

:::

## 不同的点击区域

通过将 `expandOnClickNode`设为 `false`，限制为只能点击树节点的缩略图标来切换是否展开

:::demo

```vue
<template>
	<v3-tree :data="data" :expandOnClickNode="false"></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		key: '1',
		label: '1',
		children: [
			{
				key: '1-1',
				label: '1-1',
				children: [
					{
						key: '1-1-1',
						label: '1-1-1',
					},
				],
			},
			{
				key: '1-2',
				label: '1-2',
			},
		],
	},
	{
		key: '2',
		label: '2',
	},
]);
</script>
```

:::

## 所有节点默认展开

:::demo

```vue
<template>
	<v3-tree :data="data" :defaultExpandAll="true"></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		key: '1',
		label: '1',
		children: [
			{
				key: '1-1',
				label: '1-1',
				children: [
					{
						key: '1-1-1',
						label: '1-1-1',
					},
				],
			},
			{
				key: '1-2',
				label: '1-2',
			},
		],
	},
	{
		key: '2',
		label: '2',
	},
]);
</script>
```

:::

## 撑满宽度

:::demo

```vue
<template>
	<v3-checkbox v-model="block">block</v3-checkbox>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-tree :data="data" :block="block"></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		key: '1',
		label: '1',
		children: [
			{
				key: '1-1',
				label: '1-1',
				children: [
					{
						key: '1-1-1',
						label: '1-1-1',
					},
				],
			},
			{
				key: '1-2',
				label: '1-2',
			},
		],
	},
	{
		key: '2',
		label: '2',
	},
]);
const block = ref(true);
</script>
```

:::

## 节点懒加载

:::demo

```vue
<template>
	<v3-tree :data="data" :lazy="true" :lazyMethod="lazyMethod"></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		key: '1',
		label: '1',
	},
	{
		key: '2',
		label: '2',
	},
]);

function lazyMethod({ node, data, resolve }) {
	let childrenLength = ~~(Math.random() * 5);
	const children = [];
	for (let i = 1; i <= childrenLength; i++) {
		children.push({
			key: `${data.key}-${i}`,
			label: `${data.key}-${i}`,
		});
	}
	setTimeout(() => {
		resolve(children);
	}, 1000);
}
</script>
```

:::

## 节点可选择

:::demo

```vue
<template>
	<v3-checkbox v-model="selectIsolate">独立节点</v3-checkbox>
	<v3-checkbox style="margin-left: 12px" v-model="selectOnClickNode"
		>扩大选择区域</v3-checkbox
	>
	<v3-button style="margin-left: 12px" type="primary" @click="getSelectionNodes"
		>获取选中的节点</v3-button
	>
	<v3-button
		style="margin-left: 12px"
		type="primary"
		@click="toggleNodeSelection"
		>切换选中指定节点</v3-button
	>
	<div style="margin-top: 12px;">
		<span>已选中：</span>
		<span>{{ selectedNodes }}</span>
	</div>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-tree
		ref="treeRef"
		:data="data"
		:selectable="true"
		:selectIsolate="selectIsolate"
		:selectOnClickNode="selectOnClickNode"
	></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const treeRef = ref();
const data = ref([
	{
		key: '1',
		label: '1',
		children: [
			{
				key: '1-1',
				label: '1-1',
				children: [
					{
						key: '1-1-1',
						label: '1-1-1',
					},
				],
			},
			{
				key: '1-2',
				label: '1-2',
			},
		],
	},
	{
		key: '2',
		label: '2',
	},
]);

const selectIsolate = ref(false);
const selectOnClickNode = ref(false);
const selectedNodes = ref([]);
function getSelectionNodes() {
	const nodes = treeRef.value?.getSelectionNodes();
	selectedNodes.value = nodes.map((v) => v.key);
}
function toggleNodeSelection() {
	treeRef.value?.toggleNodeSelection('1-1');
}
</script>
```

:::

## 手风琴模式

:::demo

```vue
<template>
	<v3-tree :data="data" :accordion="true"></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		key: '1',
		label: '1',
		children: [
			{
				key: '1-1',
				label: '1-1',
				children: [
					{
						key: '1-1-1',
						label: '1-1-1',
					},
				],
			},
			{
				key: '1-2',
				label: '1-2',
				children: [
					{
						key: '1-2-1',
						label: '1-2-1',
					},
				],
			},
		],
	},
	{
		key: '2',
		label: '2',
		children: [
			{
				key: '2-1',
				label: '2-1',
			},
			{
				key: '2-2',
				label: '2-2',
				children: [
					{
						key: '2-2-1',
						label: '2-2-1',
					},
					{
						key: '2-2-2',
						label: '2-2-2',
					},
				],
			},
		],
	},
]);
</script>
```

:::

## 禁用树节点

可以禁用树节点的复选框

:::demo

```vue
<template>
	<v3-button @click="getSelectionNodes">获取已选中的节点</v3-button>
	<div style="margin-top: 12px;">
		<span>已选中：</span>
		<span>{{ selectedNodes }}</span>
	</div>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-tree :data="data" :selectable="true" ref="treeRef"></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		key: '1',
		label: '1',
		children: [
			{
				key: '1-1',
				label: '1-1',
				children: [
					{
						key: '1-1-1',
						label: '1-1-1',
						disabled: true,
					},
				],
			},
			{
				key: '1-2',
				label: '1-2',
			},
		],
	},
	{
		key: '2',
		label: '2',
		disabled: true,
	},
]);

const treeRef = ref();
const selectedNodes = ref([]);
function getSelectionNodes() {
	const nodes = treeRef.value?.getSelectionNodes();
	selectedNodes.value = nodes.map((v) => v.key);
}
</script>
```

:::

## 树节点拖拽

可以通过 `allowDragMethod`方法判断单个树节点是否可以拖拽，可以通过 `allowDropMethod`方法判断单个树节点是否可以放置

:::demo

```vue
<template>
	<v3-tree
		:data="data"
		:draggable="true"
		:block="true"
		:selectable="true"
		:allowDragMethod="allowDragMethod"
		:allowDropMethod="allowDropMethod"
	></v3-tree>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		key: '1',
		label: '1',
		children: [
			{
				key: '1-1',
				label: '1-1',
				children: [
					{
						key: '1-1-1',
						label: '1-1-1',
					},
				],
			},
			{
				key: '1-2',
				label: '1-2',
				children: [
					{
						key: '1-2-1',
						label: '1-2-1',
					},
				],
			},
		],
	},
	{
		key: '2',
		label: '2',
		children: [
			{
				key: '2-1',
				label: '2-1',
			},
			{
				key: '2-2',
				label: '2-2',
				children: [
					{
						key: '2-2-1',
						label: '2-2-1',
					},
					{
						key: '2-2-2',
						label: '2-2-2',
					},
				],
			},
		],
	},
]);

function allowDragMethod({ node, data }) {
	return node.key.startsWith('1');
}

function allowDropMethod({ node, data }) {
	return node.key.startsWith('2');
}
</script>
```

:::

## API

### Tree Props

|        参数名        | 说明                                       | 类型                                                                                         | 可选值 | 默认值 | 是否必填 |
| :------------------: | ------------------------------------------ | -------------------------------------------------------------------------------------------- | ------ | ------ | -------- |
|         data         | 树形数据源                                 | ITreeData[]                                                                                  |        | []     |          |
|       nodeKey        | 唯一标识每个树节点                         | ITreeNodeKey                                                                                 |        |        |          |
|        props         | 每个节点对应的 `data`中的键                | ITreeProp                                                                                    |        |        |          |
|         lazy         | 节点是否懒加载                             | boolean                                                                                      |        | false  |          |
|      lazyMethod      | 节点懒加载数据的方法                       | (options: { node:ITreeNode, data:ITreeData, resolve: (children:ITreeData[]) =>void }) =>void |        |        |          |
|      selectable      | 节点是否可选择                             | boolean                                                                                      |        | false  |          |
| highlightFocusedNode | 聚焦的节点是否高亮显示                     | boolean                                                                                      |        | true   |          |
|    selectIsolate     | 在节点可选择的情况下，父子节点是否独立选择 | boolean                                                                                      |        | false  |          |
|  expandOnClickNode   | 是否在点击节点任意区域后展开该节点         | boolean                                                                                      |        | true   |          |
|  selectOnClickNode   | 是否在点击节点任意区域后选中该节点         | boolean                                                                                      |        | false  |          |
|      accordion       | 手风琴模式，即同级节点只显示一个           | boolean                                                                                      |        | false  |          |
|        indent        | 缩进的大小（单位为 `px`）                  | number                                                                                       |        | 12     |          |
|      draggable       | 节点是否可拖动                             | boolean                                                                                      |        | false  |          |
|   defaultExpandAll   | 所有节点是否默认展开                       | boolean                                                                                      |        | false  |          |
|        block         | 节点宽度是否撑开                           | boolean                                                                                      |        | false  |          |
|   allowDragMethod    | 对于每个节点，判断是否可拖动               | (options: { node:ITreeNode, data:ITreeData }) =>boolean                                      |        |        |          |
|   allowDropMethod    | 对于某个节点，判断是否可放置               | (options: { node:ITreeNode, data:ITreeData }) =>boolean                                      |        |        |          |

### Tree Types

```typescript
export type ITreeData = any;
export interface ITreeNode {
	key: ITreeBaseKey;
	label: string;
	selected: boolean;
	indeterminate: boolean;
	loaded: boolean;
	loading: boolean;
	expanded: boolean;
	disabled: boolean;
	data: ITreeData;
	root: boolean;
	children?: ITreeNode[];
	parent?: ITreeNode;
}
export type ITreeBaseKey = string | number | symbol;
export type ITreeNodeKey = ITreeBaseKey &
	((options: { data: ITreeData }) => ITreeBaseKey);
export interface ITreeProp {
	key?: string;
	label?: string;
	children?: string;
	disabled?: string;
}
```

### Tree Exposes

| 属性名              | 说明                   | 类型     |
| ------------------- | ---------------------- | -------- |
| getSelectionNodes   | 获取选中的所有节点     | Function |
| toggleNodeSelection | 切换某个节点的选中状态 | Function |
