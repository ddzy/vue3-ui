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

### 合并多选的值以便于节省空间

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
