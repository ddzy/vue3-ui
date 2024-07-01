# Tab 标签页

## 基本用法

:::demo

```vue
<template>
	<v3-tab>
		<v3-tab-pane v-for="v in tabs" :key="v._id" :name="v._id" :title="v.name">{{
			v._id
		}}</v3-tab-pane>
	</v3-tab>
</template>
<script lang="ts" setup>
const tabs = [
	{
		_id: 1,
		name: '选项1',
	},
	{
		_id: 2,
		name: '选项2',
	},
	{
		_id: 3,
		name: '选项3',
	},
	{
		_id: 4,
		name: '选项4',
	},
	{
		_id: 5,
		name: '选项5',
	},
];
</script>
```

:::
