# Table 表格

## 基础表格

:::demo

```vue
<template>
	<v3-table :data="data" :columns="columns"> </v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

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
		label: '地址',
	},
]);
</script>
```

:::

## 自定义列

:::demo

```vue
<template>
	<v3-table :data="data" :columns="columns">
		<v3-table-column prop="handle" label="操作">
			<template v-slot="scope">
				<v3-button type="text">编辑</v3-button>
				<v3-divider direction="vertical"></v3-divider>
				<v3-button type="text">删除</v3-button>
			</template>
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
		label: '地址',
	},
	{
		slot: 'handle',
	},
]);
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

默认为自动排序，可以通过将`sortable`设置为`custom`，并监听`sortChange`事件来自定义排序；
默认的排序顺序为：无 -> 升序 -> 降序，可以通过`sortBy`指定排序的顺序；
也可以通过调用`table`提供的`sort`方法，传入`defaultSort`参数来手动排序;
如果需要清除排序状态并恢复原始数据，可调用`table`提供的`clearSort`方法；

:::demo

```vue
<template>
	<v3-space>
		<v3-button type="primary" icon="Up" @click="sort('ascending')"
			>升序</v3-button
		>
		<v3-button type="primary" icon="Down" @click="sort('descending')"
			>降序</v3-button
		>
		<v3-button type="danger" icon="Close" @click="clearSort"
			>清除排序</v3-button
		>
	</v3-space>
	<v3-table
		:data="data"
		:defaultSort="{
			prop: 'age',
			order: 'descending',
		}"
		ref="tableRef"
		border
		@sortChange="handleSortChange"
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
		fixed: 'left',
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

const tableRef = ref();

function handleSortChange(prop: string, order: string) {
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
function sort(order) {
	tableRef.value.sort('age', order);
}
function clearSort() {
	tableRef.value.clearSort();
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

通过`type = 'radio'`开启单选列，需要注意的是，此时表格必须设置`rowKey`属性，为每一行指定唯一的标识；同时表格可以开启`highlightSelectionRow`属性，高亮当前选中的所有行

调用表格的`setCurrentRow`方法，可以手动选中某一行（单选表格）；
调用表格的`clearSelection`方法，可以清空当前选中的所有行；
调用表格的`getSelectionRows`方法，获取已选中的行；

:::demo

```vue
<template>
	<v3-space>
		<v3-button type="primary" @click="setCurrentRow">选中第2行</v3-button>
		<v3-button type="danger" @click="clearSelection">清除选择</v3-button>
		<v3-button type="danger" @click="getSelectionRows">获取选中的行</v3-button>
	</v3-space>
	<v3-space>
		<p>选中的数据为：</p>
		<p>{{ selectedData }}</p>
	</v3-space>
	<v3-table
		:data="data"
		:row-key="({ row }) => row._id"
		:highlightSelectionRow="true"
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

const selectedData = ref();
function getSelectionRows() {
	const rowKeys = tableRef.value.getSelectionRows();
	selectedData.value = data.value.find((v) => v._id === rowKeys[0]);
}
function setCurrentRow() {
	tableRef.value.setCurrentRow(2);
	getSelectionRows();
}
function clearSelection() {
	tableRef.value.clearSelection();
	getSelectionRows();
}
function handleSelectionChange(rowKeys: number[]) {
	selectedData.value = data.value.find((v) => v._id === rowKeys[0]);
}
</script>
```

:::

## 多选列

通过`type = 'checkbox'`开启多选列，需要注意的是，此时表格必须设置`rowKey`属性，为每一行指定唯一的标识；同时表格可以开启`highlightSelectionRow`属性，高亮当前选中的所有行

调用表格的`toggleRowSelection`方法，可以手动选中某一行（多选表格）；
调用表格的`clearSelection`方法，可以清空当前选中的所有行；

:::demo

```vue
<template>
	<v3-space>
		<v3-button type="primary" @click="toggleRowSelection"
			>切换选中第2行</v3-button
		>
		<v3-button type="primary" @click="toggleAllSelection">切换全选</v3-button>
		<v3-button type="danger" @click="clearSelection">清除选择</v3-button>
		<v3-button type="success" @click="getSelectionRows">获取选中的行</v3-button>
	</v3-space>
	<v3-space>
		<p>选中的数据为：</p>
		<p>{{ selectedData }}</p>
	</v3-space>
	<v3-table
		:data="data"
		:row-key="'_id'"
		:highlightSelectionRow="true"
		ref="tableRef"
		@selectAll="handleSelectAll"
		@select="handleSelect"
		@selectionChange="handleSelectionChange"
	>
		<v3-table-column type="checkbox" label="全选"> </v3-table-column>
		<v3-table-column prop="name" label="姓名"> </v3-table-column>
		<v3-table-column prop="age" label="年龄"></v3-table-column>
		<v3-table-column prop="address" label="地址"></v3-table-column>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		_id: '1',
		name: 'Alice',
		age: 20,
		address: '辽宁省大连市沙河口区',
	},
	{
		_id: '2',
		name: 'Bob',
		age: 30,
		address: '广东省河源市源城区',
	},
	{
		_id: '3',
		name: 'Carl',
		age: 40,
		address: '四川省成都市新都区',
	},
	{
		_id: '4',
		name: 'Davide',
		age: 50,
		address: '湖北省荆州市沙市区',
	},
	{
		_id: '5',
		name: 'Emma',
		age: 34,
		address: '甘肃省兰州市城关区',
	},
	{
		_id: '6',
		name: 'Alick',
		age: 25,
		address: '北京市朝阳区',
	},
	{
		_id: '7',
		name: 'Bolice',
		age: 11,
		address: '广东省广州市越秀区',
	},
	{
		_id: '8',
		name: 'John',
		age: 33,
		address: '广东省东莞市南城区',
	},
]);
const tableRef = ref();

const selectedData = ref([]);
function getSelectionRows() {
	const rowKeys = tableRef.value.getSelectionRows();
	selectedData.value = data.value.filter((v) => rowKeys.includes(v._id));
}
function clearSelection() {
	tableRef.value.clearSelection();
	getSelectionRows();
}
function toggleRowSelection() {
	tableRef.value.toggleRowSelection('2');
	getSelectionRows();
}
function toggleAllSelection() {
	tableRef.value.toggleAllSelection();
	getSelectionRows();
}

function handleSelectAll({ rowKeys, column, selected }) {
	console.log('rowKeys, column, selected :>> ', rowKeys, column, selected);
}
function handleSelect({ rowKey, rowKeys, row, column, selected }) {
	console.log(
		'rowKey, rowKeys, row, column, selected :>> ',
		rowKey,
		rowKeys,
		row,
		column,
		selected,
	);
}
function handleSelectionChange(rowKeys: string[]) {
	selectedData.value = data.value.filter((v) => rowKeys.includes(v._id));
}
</script>
```

:::

## 展开行

PS：必须指定`row-key`

可以通过`table`提供的`toggleRowExpansion`方法，手动切换行的展开，如果提供第二个参数，可以指定行是否展开

:::demo

```vue
<template>
	<v3-space>
		<v3-button type="primary" @click="toggleRowExpansion"
			>切换展开第二行</v3-button
		>
	</v3-space>
	<v3-table :data="data" :columns="columns" ref="tableRef" rowKey="name" border>
		<v3-table-column type="expand" prop="expand">
			<template v-slot="scope">
				<span>（{{ scope.rowIndex }}）：</span>
				<span>{{ scope.row }}</span>
			</template>
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
]);
const columns = ref([
	{
		slot: 'expand',
	},
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

const tableRef = ref();

function toggleRowExpansion() {
	tableRef.value.toggleRowExpansion('Bob');
}
</script>
```

:::

## 树形数据与懒加载

PS：必须指定`row-key`，可以通过`treeMethod`方法异步获取表格数据

:::demo

```vue
<template>
	<v3-table
		:data="data"
		:columns="columns"
		:tree="true"
		:treeProps="{
			children: 'children',
			hasChildren: 'hasChildren',
		}"
		ref="tableRef"
		rowKey="name"
		border
	>
	</v3-table>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-table
		:data="data2"
		:columns="columns"
		:tree="true"
		:treeLazyload="true"
		:treeMethod="treeMethod"
		ref="tableRef"
		rowKey="name"
		border
	>
	</v3-table>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const data = ref([
	{
		name: 'A',
		age: 20,
		address: '辽宁省大连市沙河口区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
		children: [
			{
				name: 'A-1',
				age: 30,
				address: '广东省河源市源城区',
				create_time: Date.now(),
				update_time: Date.now(),
				updater: 'admin',
				children: [
					{
						name: 'A-1-1',
						age: 20,
						address: '辽宁省大连市沙河口区',
						create_time: Date.now(),
						update_time: Date.now(),
						updater: 'admin',
					},
				],
			},
			{
				name: 'A-2',
				age: 40,
				address: '四川省成都市新都区',
				create_time: Date.now(),
				update_time: Date.now(),
				updater: 'admin',
			},
			{
				name: 'A-3',
				age: 50,
				address: '湖北省荆州市沙市区',
				create_time: Date.now(),
				update_time: Date.now(),
				updater: 'admin',
			},
		],
	},
	{
		name: 'B',
		age: 34,
		address: '甘肃省兰州市城关区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
	},
	{
		name: 'C',
		age: 25,
		address: '北京市朝阳区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
	},
	{
		name: 'D',
		age: 11,
		address: '广东省广州市越秀区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
	},
	{
		name: 'E',
		age: 33,
		address: '广东省东莞市南城区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
	},
]);
const data2 = ref([
	{
		name: 'A',
		age: 20,
		address: '辽宁省大连市沙河口区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
		hasChildren: true,
	},
	{
		name: 'B',
		age: 34,
		address: '甘肃省兰州市城关区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
	},
	{
		name: 'C',
		age: 25,
		address: '北京市朝阳区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
	},
	{
		name: 'D',
		age: 11,
		address: '广东省广州市越秀区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
	},
	{
		name: 'E',
		age: 33,
		address: '广东省东莞市南城区',
		create_time: Date.now(),
		update_time: Date.now(),
		updater: 'admin',
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

const tableRef = ref();
function treeMethod({ row, resolve }) {
	setTimeout(() => {
		resolve([
			{
				name: 'A-1',
				age: 30,
				address: '广东省河源市源城区',
				create_time: Date.now(),
				update_time: Date.now(),
				updater: 'admin',
			},
			{
				name: 'A-2',
				age: 40,
				address: '四川省成都市新都区',
				create_time: Date.now(),
				update_time: Date.now(),
				updater: 'admin',
			},
			{
				name: 'A-3',
				age: 50,
				address: '湖北省荆州市沙市区',
				create_time: Date.now(),
				update_time: Date.now(),
				updater: 'admin',
			},
		]);
	}, 1000);
}
</script>
```

:::
