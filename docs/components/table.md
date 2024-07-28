# Table 表格

## 基础表格

:::demo

```vue
<template>
	<v3-table :data="data">
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
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
```

:::

## 自定义表头和单元格

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
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
		<v3-table-column prop="handle" label="操作">
			<template #default="scope">
				<v3-button type="text">编辑</v3-button>
				<v3-divider></v3-divider>
				<v3-button type="text">删除</v3-button>
			</template>
		</v3-table-column>
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
	align-items: center;
}
.red {
	color: red;
}
</style>
```

:::

## 边框和条纹

:::demo

```vue
<template>
	<v3-checkbox v-model="showHeader">是否显示表头</v3-checkbox>
	<v3-checkbox v-model="border">是否显示边框</v3-checkbox>
	<v3-checkbox v-model="stripe">是否显示条纹</v3-checkbox>
	<v3-checkbox v-model="highlightHoverRow">是否hover时高亮行</v3-checkbox>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-table
		:data="data"
		:border="border"
		:stripe="stripe"
		:showHeader="showHeader"
		:highlightHoverRow="highlightHoverRow"
	>
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const showHeader = ref(true);
const border = ref(true);
const stripe = ref(true);
const highlightHoverRow = ref(true);
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
```

:::
