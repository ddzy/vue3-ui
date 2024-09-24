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
