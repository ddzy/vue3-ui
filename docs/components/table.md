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

## 自定义类名

:::demo

```vue
<template>
	<v3-table
		:data="data"
		:rowClassName="({ row, rowIndex }) => (rowIndex % 2 !== 0 ? rowClass : '')"
		:cellClassName="
			({ row, rowIndex, column, columnIndex }) =>
				(rowIndex + columnIndex) % 2 === 0 ? cellClass : ''
		"
		:headerRowClassName="headerRowClass"
		:headerCellClassName="headerCellClass"
	>
		<v3-table-column
			prop="name"
			label="姓名"
			:labelClassName="columnLabelClass"
			:className="columnClass"
		>
		</v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref, useCssModule } from 'vue';

const $style = useCssModule();

const rowClass = $style['custom-row'];
const cellClass = $style['custom-cell'];
const headerRowClass = $style['custom-header-row'];
const headerCellClass = $style['custom-header-cell'];
const columnLabelClass = $style['custom-column-label__name'];
const columnClass = $style['custom-column__name'];
const data = [
	{
		name: 'Alice',
		age: 20,
		address: '辽宁省大连市沙河口区',
	},
	{
		name: 'Bob',
		age: 11,
		address: '广东省河源市源城区',
	},
	{
		name: 'Carl',
		age: 18,
		address: '四川省成都市新都区',
	},
	{
		name: 'Davide',
		age: 50,
		address: '湖北省荆州市沙市区',
	},
	{
		name: 'Emma',
		age: 34,
		address: '甘肃省兰州市城关区',
	},
];
</script>
<style module>
.custom-row {
	background-color: rgba(223, 243, 254, 1);
}
.custom-cell {
	color: rgba(99, 185, 49, 1);
}
.custom-header-row {
	background-color: #f1f1f1;
}
.custom-header-cell {
	color: rgba(0, 160, 255, 1);
}
.custom-column-label__name {
	color: red;
}
.custom-column__name {
	color: orange;
}
</style>
```

:::

## 固定表头

:::demo

```vue
<template>
	<v3-table :data="data" maxHeight="200px" border>
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
		age: 11,
		address: '广东省河源市源城区',
	},
	{
		name: 'Carl',
		age: 18,
		address: '四川省成都市新都区',
	},
	{
		name: 'Davide',
		age: 50,
		address: '湖北省荆州市沙市区',
	},
	{
		name: 'Emma',
		age: 34,
		address: '甘肃省兰州市城关区',
	},
	{
		name: 'Alick',
		age: 25,
		address: '北京市朝阳区',
	},
	{
		name: 'Bolice',
		age: 11,
		address: '广东省广州市越秀区',
	},
	{
		name: 'John',
		age: 33,
		address: '广东省东莞市南城区',
	},
];
</script>
```

:::

## 固定列宽

:::demo

```vue
<template>
	<v3-table :data="data">
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column
			prop="address"
			label="地址"
			width="110px"
		></v3-table-column>
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

## 可拖动表头

:::demo

```vue
<template>
	<v3-table :data="data" border>
		<v3-table-column
			prop="name"
			label="姓名"
			width="100"
			resizable
		></v3-table-column>
		<v3-table-column
			prop="age"
			label="年龄"
			width="100"
			resizable
		></v3-table-column>
		<v3-table-column prop="address" label="地址" resizable></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const data = ref([]);
onMounted(() => {
	setTimeout(() => {
		data.value = [
			{
				name: 'Alice',
				age: 20,
				address: '辽宁省大连市沙河口区',
			},
			{
				name: 'Bob',
				age: 11,
				address: '广东省河源市源城区',
			},
			{
				name: 'Carl',
				age: 18,
				address: '四川省成都市新都区',
			},
		];
	}, 1000);
});
</script>
```

:::

## 加载中

:::demo

```vue
<template>
	<v3-switch v-model="loading"></v3-switch>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-table :data="data" :loading="loading">
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(false);
const data = ref([
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
]);
</script>
```

:::
