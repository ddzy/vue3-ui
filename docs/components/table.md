# Table 表格

## 基础表格

:::demo

```vue
<template>
	<v3-table :data="data">
		<v3-table-column prop="name" label="姓名">
			<template #label>
				<p>姓名slot</p>
			</template>
			<template #default="scope">
				<span :class="$style.red">{{ scope.row.name }}</span>
			</template>
		</v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = [
	{
		name: 'Alice',
		age: 20,
		address: 'USA',
	},
	{
		name: 'Bob',
		age: 30,
		address: 'UK',
	},
	{
		name: 'Carl',
		age: 40,
		address: 'China',
	},
];
</script>
<style module>
.red {
	color: red;
}
</style>
```

:::
