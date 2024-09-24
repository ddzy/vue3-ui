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
