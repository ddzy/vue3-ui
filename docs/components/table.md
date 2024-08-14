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

## 指定列宽

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

## 空状态

可以通过`emptyText`自定义空文本，也可以通过`slot='empty'`自定义空状态显示的内容

:::demo

```vue
<template>
	<v3-table :data="data">
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
	<v3-table :data="data" emptyText="什么都没有~">
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
	<v3-table :data="data">
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
		<template #empty>
			<div :class="$style.empty">
				<img
					src="https://oss.yyge.top/test/images/empty.png"
					:class="$style['empty-img']"
				/>
				<span :class="$style['empty-text']">无数据</span>
			</div>
		</template>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const radio = ref('get');
const data = ref([]);
</script>
<style module>
.empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 200px;
}
.empty-img {
	width: 200px;
	height: 128px;
}
.empty-text {
	color: #aaa;
}
</style>
```

:::

## 值预处理

:::demo

```vue
<template>
	<v3-table :data="data" border>
		<v3-table-column
			v-for="v in columns"
			v-bind="v"
			:key="v.prop"
		></v3-table-column>
		<v3-table-column prop="handle" label="操作">
			<v3-button type="text" icon="EditTwo"></v3-button>
			<v3-divider></v3-divider>
			<v3-button type="text" icon="Delete"></v3-button>
		</v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		name: 'Alice',
		age: 20,
		address: '辽宁省大连市沙河口区',
		create_time: Date.now(),
	},
	{
		name: 'Bob',
		age: 30,
		address: '广东省河源市源城区',
		create_time: Date.now(),
	},
	{
		name: 'Carl',
		age: 40,
		address: '四川省成都市新都区',
		create_time: Date.now(),
	},
]);
const columns = ref([
	{
		prop: 'name',
		label: '姓名',
	},
	{
		prop: 'age',
		label: '年龄',
	},
	{
		prop: 'address',
		label: '姓名',
	},
	{
		prop: 'create_time',
		label: '创建时间',
		formatter: (row) => {
			return new Date(row.create_time).toLocaleString();
		},
	},
]);
</script>
```

:::

## 固定列

:::demo

```vue
<template>
	<v3-table :data="data" border>
		<v3-table-column
			v-for="v in columns"
			v-bind="v"
			:key="v.prop"
		></v3-table-column>
		<v3-table-column prop="handle" label="操作" fixed="right">
			<v3-button type="text" icon="EditTwo"></v3-button>
			<v3-divider></v3-divider>
			<v3-button type="text" icon="Delete"></v3-button>
		</v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref();
setTimeout(() => {
	data.value = [
		{
			name: 'Alice',
			age: 20,
			address: '辽宁省大连市沙河口区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Bob',
			age: 30,
			address: '广东省河源市源城区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Carl',
			age: 40,
			address: '四川省成都市新都区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Davide',
			age: 50,
			address: '湖北省荆州市沙市区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Emma',
			age: 34,
			address: '甘肃省兰州市城关区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Alick',
			age: 25,
			address: '北京市朝阳区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Bolice',
			age: 11,
			address: '广东省广州市越秀区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'John',
			age: 33,
			address: '广东省东莞市南城区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
	];
}, 1000);
const columns = ref([
	{
		prop: 'name',
		label: '姓名',
		fixed: 'left',
	},
	{
		prop: 'age',
		label: '年龄',
	},
	{
		prop: 'address',
		label: '姓名',
	},
	{
		prop: 'create_time',
		label: '创建时间',
		formatter: (row) => {
			return new Date(row.create_time).toLocaleString();
		},
	},
	{
		prop: 'update_time',
		label: '修改时间',
		formatter: (row) => {
			return new Date(row.update_time).toLocaleString();
		},
	},
	{
		prop: 'updater',
		label: '修改人',
		fixed: 'right',
	},
]);
</script>
```

:::

## 排序

默认为自动排序，可以通过将`sortable`设置为`custom`来自定义排序；  
默认的排序顺序为：无 -> 升序 -> 降序，可以通过`sortBy`指定排序的顺序

:::demo

```vue
<template>
	<v3-table
		:data="data"
		:defaultSort="{
			prop: 'age',
			order: 'descending',
		}"
		border
		maxHeight="300px"
		@sort="handleSort"
	>
		<v3-table-column
			v-for="v in columns"
			v-bind="v"
			:key="v.prop"
		></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([]);
setTimeout(() => {
	data.value = [
		{
			name: 'Alice',
			age: 20,
			address: '辽宁省大连市沙河口区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Bob',
			age: 30,
			address: '广东省河源市源城区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Carl',
			age: 40,
			address: '四川省成都市新都区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Davide',
			age: 50,
			address: '湖北省荆州市沙市区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Emma',
			age: 34,
			address: '甘肃省兰州市城关区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Alick',
			age: 25,
			address: '北京市朝阳区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'Bolice',
			age: 11,
			address: '广东省广州市越秀区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
		{
			name: 'John',
			age: 33,
			address: '广东省东莞市南城区',
			create_time: Date.now(),
			update_time: Date.now(),
			updater: 'admin',
		},
	];
}, 1000);
const columns = ref([
	{
		prop: 'name',
		label: '姓名',
		fixed: 'left',
		sortable: true,
		resizable: true,
	},
	{
		prop: 'age',
		label: '年龄',
		sortable: 'custom',
	},
	{
		prop: 'address',
		label: '地址',
	},
	{
		prop: 'create_time',
		label: '创建时间',
		formatter: (row) => {
			return new Date(row.create_time).toLocaleString();
		},
	},
	{
		prop: 'update_time',
		label: '修改时间',
		formatter: (row) => {
			return new Date(row.update_time).toLocaleString();
		},
	},
	{
		prop: 'updater',
		label: '修改人',
	},
]);

function handleSort(prop: string, order: string) {
	switch (order) {
		case 'none': {
			break;
		}
		case 'ascending': {
			data.value.sort((a, b) => {
				return a[prop] - b[prop];
			});
			break;
		}
		case 'descending': {
			data.value.sort((a, b) => {
				return b[prop] - a[prop];
			});
			break;
		}
		default: {
			break;
		}
	}
}
</script>
```

:::

## 溢出工具提示

:::demo

```vue
<template>
	<v3-table :data="data">
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column
			:show-overflow-tooltip="true"
			prop="address"
			label="地址"
			width="120px"
		></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = [
	{
		name: 'Alice',
		age: 20,
		address: '辽宁省大连市沙河口区，辽宁省大连市沙河口区，辽宁省大连市沙河口区',
	},
	{
		name: 'Bob',
		age: 30,
		address: '辽宁省大连市沙河口区，辽宁省大连市沙河口区，辽宁省大连市沙河口区',
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

## 序号列

:::demo

```vue
<template>
	<v3-table :data="data">
		<v3-table-column type="index" label="序号"> </v3-table-column>
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

## 单选列

通过`type = 'radio'`开启单选列，需要注意的是，此时表格必须设置`rowKey`属性，为每一行指定唯一的标识；同时表格可以开启`highlightSelectedRow`属性，高亮当前选中的所有行

调用表格的`setCurrentRow`方法，可以手动选中某一行；
调用表格的`clearSelection`方法，可以清空当前选中的所有行；

:::demo

```vue
<template>
	<v3-space>
		<v3-button type="primary" @click="setCurrentRow">选中第2行</v3-button>
		<v3-button type="danger" @click="clearSelection">清除选择</v3-button>
	</v3-space>
	<v3-space>
		<p>选中的数据为：</p>
		<p>{{ selectedData }}</p>
	</v3-space>
	<v3-table
		:data="data"
		:row-key="({ row }) => row._id"
		:highlightSelectedRow="true"
		ref="tableRef"
		@selectionChange="handleSelectionChange"
	>
		<v3-table-column type="radio" label="单选"> </v3-table-column>
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		_id: 1,
		name: 'Alice',
		age: 20,
		address: '辽宁省大连市沙河口区',
	},
	{
		_id: 2,
		name: 'Bob',
		age: 30,
		address: '广东省河源市源城区',
	},
	{
		_id: 3,
		name: 'Carl',
		age: 40,
		address: '四川省成都市新都区',
	},
]);
const tableRef = ref();

const selectedData = ref<(typeof data.value)[0]>();
function handleSelectionChange(newValue: number, oldValue: number) {
	const found = data.value.find((v) => v._id === newValue);
	selectedData.value = found;
}
function setCurrentRow() {
	tableRef.value.setCurrentRow(2);
}
function clearSelection() {
	tableRef.value.clearSelection();
}
</script>
```

:::
