## 下拉选项（Select）

### 基本的下拉选项

```vue demo
<template>
  <v3-select v-model="state.selectValue" style="max-width: 250px;">
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue: 'Beijing',
      selectOptions: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: true,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

### 绑定对象值（需指定【value-key】属性）

```vue demo
<template>
  <v3-select v-model="state.selectValue" style="max-width: 250px;" value-key="_id">
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue: '',
      selectOptions: [
				{
					label: '对象1',
					value: {
						_id: 1,
						name: 1,
						age: 1,
					},
					disabled: false,
				},
				{
					label: '对象2',
					value: {
						_id: 2,
						name: 2,
						age: 2,
					},
					disabled: false,
				},
				{
					label: '对象3',
					value: {
						_id: 3,
						name: 3,
						age: 3,
					},
					disabled: false,
				},
				{
					label: '对象4',
					value: {
						_id: 4,
						name: 4,
						age: 4,
					},
					disabled: false,
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

### 禁用状态

```vue demo
<template>
  <v3-select v-model="state.selectValue" style="max-width: 250px;" disabled>
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue: 'Beijing',
      selectOptions: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: true,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

### 可清空所选值

```vue demo
<template>
  <v3-select v-model="state.selectValue" style="max-width: 250px;" clearable>
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue: 'Beijing',
      selectOptions: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: true,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

### 过滤选项

```vue demo
<template>
  <v3-select
    v-model="state.selectValue"
    style="max-width: 250px;"
    clearable
    :noDataText="'暂时没有数据'"
    :filterable="true"
		:filterMethod="filterMethod"
    @clear="handleClear"
    @visible="handleVisible"
  >
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue: 'Beijing',
      selectOptions: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: true,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
      selectOptionsCopy: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: true,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
		});

    function filterMethod(keyword: string) {
			if (!keyword) {
				state.selectOptions = state.selectOptionsCopy.slice();
			} else {
				state.selectOptions = state.selectOptionsCopy.filter(v => {
					return v.label.includes(keyword);
				});
			}
		}

    function handleVisible(visible: boolean) {
			if (!visible) {
				state.selectOptions = state.selectOptionsCopy.slice();
			}
		}

    function handleClear() {
			state.selectOptions = state.selectOptionsCopy.slice();
		}

		return {
			state,
      filterMethod,
      handleVisible,
      handleClear,
		};
	},
});
</script>
```

### 可开启远程搜索

```vue demo
<template>
  <v3-select
    v-model="state.selectValue"
    style="max-width: 250px;"
    clearable
    :noDataText="'暂时没有数据'"
    :filterable="true"
    :remote="true"
		:remoteMethod="remoteMethod"
    @clear="handleClear"
    @visible="handleVisible"
  >
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue: '',
      selectOptions: [],
      selectOptionsCopy: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: false,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
		});

    function remoteMethod(keyword: string) {
			if (!keyword) {
				state.selectOptions = [];
				return;
			}

			const result = state.selectOptionsCopy.filter(v => {
				return v.label.includes(keyword);
			});

			setTimeout(() => {
				(state.selectOptions as typeof state.selectOptionsCopy) = result;
			}, 1000);
		}

    function handleVisible(visible: boolean) {
			if (!visible) {
				state.selectOptions = [];
			}
		}

    function handleClear() {
			state.selectOptions = state.selectOptionsCopy.slice();
		}

		return {
			state,
      remoteMethod,
      handleVisible,
      handleClear,
		};
	},
});
</script>
```

### 多选

```vue demo
<template>
  <v3-select v-model="state.selectValue" style="max-width: 250px;" multiple>
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue: 'Beijing',
      selectOptions: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: false,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

### 合并多选的值以便于节省空间

```vue demo
<template>
  <v3-select v-model="state.selectValue" style="max-width: 250px;" multiple collapseTags>
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue: 'Beijing',
      selectOptions: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: false,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

### 不同尺寸的下拉选项

```vue demo
<template>
  <v3-select
    v-model="state.selectValue1"
    style="max-width: 250px;"
    multiple
    size="small"
  >
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
  <v3-select
    v-model="state.selectValue2"
    style="max-width: 250px; margin-top: 20px;"
    multiple
    size="medium"
  >
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
  <v3-select
    v-model="state.selectValue3"
    style="max-width: 250px; margin-top: 20px;"
    multiple
    size="large"
  >
    <v3-select-option
      v-for="v in state.selectOptions"
      :key="v.value"
      :value="v.value"
      :label="v.label"
      :disabled="v.disabled"
    ></v3-select-option>
  </v3-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
      selectValue1: 'Beijing',
      selectValue2: 'Shanghai',
      selectValue3: 'Shenzhen',
      selectOptions: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: false,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],
		});

		return {
			state,
		};
	},
});
</script>
```

### API

#### Select参数

| 参数名            | 说明                                                             | 类型                                       | 可选值                 | 默认值       |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------------ | ---------------------- | ------------ |
| modelValue        | 下拉框的值（通过 `v-model` 绑定）                                | string / boolean / number / object / array |                        | 必填         |
| multiple          | 是否开启多选                                                     | boolean                                    |                        | false        |
| disabled          | 是否禁用下拉框                                                   | boolean                                    |                        | false        |
| valueKey          | 当 `modelValue` 的值为对象类型，该值为 `modelValue` 的唯一 `key` | string                                     |                        |              |
| clearable         | 是否可清空所选值                                                 | boolean                                    |                        | false        |
| collapseTags      | 在多选状态下，选中多个值，合并为一个展示，可节省空间             | boolean                                    |                        | false        |
| multipleLimit     | 多选状态下，限制选择的数量                                       | number                                     |                        | -1           |
| placeholder       |                                                                  | string                                     |                        | 请选择内容   |
| remotePlaceholder |                                                                  | string                                     |                        | 请输入关键字 |
| filterable        | 是否启用本地模糊搜索                                             | boolean                                    |                        | false        |
| remote            | 是否启用远程搜索                                                 | boolean                                    |                        | false        |
| loading           | 下拉框的加载状态                                                 | boolean                                    |                        | false        |
| loadingText       | 加载时显示的文本                                                 | string                                     |                        | 获取数据中   |
| noMatchText       | 在 `filterable` 状态下，没有匹配的数据时显示的文本               | string                                     |                        | 无匹配数据   |
| noDataText        | 在 `remote` 或选项为空的状态下显示的文本                         | string                                     |                        | 无数据       |
| filterMethod      | 自定义本地过滤的方法                                             | function                                   |                        | null         |
| remoteMethod      | 自定义远程搜索的方法                                             | function                                   |                        | null         |
| size              | 下拉框的尺寸                                                     | string                                     | small / medium / large | medium       |

#### Select事件

| 事件名  | 说明                       | 回调参数             |
| ------- | -------------------------- | -------------------- |
| visible | 下拉框显示 / 隐藏时触发    | (isVisible: boolean) |
| change  | 下拉选项的值发生变化时触发 | (value: string       | boolean | number | object | array) |

#### Select插槽

| 插槽名  | 说明     | 子标签       |
| ------- | -------- | ------------ |
| default | 默认插槽 | SelectOption |

#### SelectOption参数

| 事件名   | 说明             | 类型                               | 可选值 | 默认值 |
| -------- | ---------------- | ---------------------------------- | ------ | ------ |
| label    | 显示的文本       | string                             |        |        |
| value    | 绑定的值         | string / boolean / number / object |        | 必填   |
| disabled | 是否禁用当前选项 | boolean                            |        | false  |
