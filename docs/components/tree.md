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

通过将`expandOnClickNode`设为`false`，限制为只能点击树节点的缩略图标来切换是否展开

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
