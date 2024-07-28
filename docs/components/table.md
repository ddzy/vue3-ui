# Table 表格

## 基础表格

:::demo

```vue
<template>
	<v3-table :data="data">
		<v3-table-column prop="name" label="姓名">
			<template #label>
				<div :class="$style['custom-label']">
					<span>姓名</span>
					<v3-tooltip content="很长的文本">
						<v3-icon type="Info"></v3-icon>
					</v3-tooltip>
				</div>
			</template>
			<template #default="scope">
				<span :class="$style.red">{{ scope.row.name }}</span>
			</template>
		</v3-table-column>
		<v3-table-column
			prop="age"
			label="年龄"
			align="left"
			headerAlign="left"
		></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = [
	{
		name: 'Alice',
		age: 20,
		address: '辽宁省大连市沙河口区',
	},
	{
		name: 'Bob',
		age: 30,
		address: '广东省河源市源城区',
	},
	{
		name: 'Carl',
		age: 40,
		address: '四川省成都市新都区',
	},
];
</script>
<style module>
.custom-label {
	display: flex;
	justify-content: center;
	align-items: center;
}
.red {
	color: red;
}
</style>
```

:::
