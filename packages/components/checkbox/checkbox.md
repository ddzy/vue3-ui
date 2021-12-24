## 复选框（Checkbox）

### 基本的复选框

可以自定义是否禁用复选框、自定义图标、添加边框

```vue demo
<template>
  <v3-checkbox
		v-model="state.checkboxValue1"
		:defaultIcon="'v3-icon-like'"
		:selectedIcon="'v3-icon-like1'"
		:indeterminatedIcon="'v3-icon-sami-select'"
		>多选1</v3-checkbox
	>
	<v3-checkbox
		v-model="state.checkboxValue2"
		:indeterminate="true"
		:border="true"
		>多选2</v3-checkbox
	>
	<v3-checkbox v-model="state.checkboxValue3" :disabled="true"
		>多选3</v3-checkbox
	>
	<v3-checkbox v-model="state.checkboxValue4" :border="true"
		>多选4</v3-checkbox
	>
  <v3-checkbox-button v-model="state.checkboxValue5"
		>多选5</v3-checkbox-button
	>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			checkboxValue1: true,
			checkboxValue2: true,
			checkboxValue3: false,
			checkboxValue4: false,
      checkboxValue5: false,
		});

		return {
			state,
		};
	},
});
</script>
```

### 复选框组

利用 `v3-button-group` 来管理一组复选框，可以绑定 `number`、`string`、`boolean` 类型的值

```vue demo
<template>
  <v3-row :gutter="20">
    <v3-col>
      <v3-checkbox-group v-model="state.checkboxValue1">
      	<v3-checkbox :label="1">1</v3-checkbox>
				<v3-checkbox :label="2" :disabled="true">多选2</v3-checkbox>
				<v3-checkbox :label="3">3</v3-checkbox>
				<v3-checkbox :label="4">4</v3-checkbox>
      </v3-checkbox-group>
    </v3-col>
    <v3-col>
      你绑定的数字是：{{ state.checkboxValue1.join(', ') }}
    </v3-col>
  </v3-row>
  <v3-row :gutter="20">
    <v3-col>
      <v3-checkbox-group v-model="state.checkboxValue2">
      	<v3-checkbox :label="'dongguan'">dongguan</v3-checkbox>
				<v3-checkbox :label="'gansu'" :disabled="true">gansu</v3-checkbox>
				<v3-checkbox :label="'lanzhou'">lanzhou</v3-checkbox>
				<v3-checkbox :label="'qingyang'">qingyang</v3-checkbox>
      </v3-checkbox-group>
    </v3-col>
    <v3-col>
      你绑定的字符串是：{{ state.checkboxValue2.join(', ') }}
    </v3-col>
  </v3-row>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			checkboxValue1: [2],
			checkboxValue2: [],
			checkboxValue3: [],
		});

		return {
			state,
		};
	},
});
</script>
```

### 按钮形式的复选框

```vue demo
<template>
  <v3-checkbox-group v-model="state.checkboxValue">
		<v3-checkbox-button
			v-for="v in state.checkboxOriginValue"
			:key="v._id"
			:label="v._id"
			:disabled="v.disabled"
			>{{ v.name }}</v3-checkbox-button
		>
	</v3-checkbox-group>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			checkboxValue: ['banana', 'orange'],
      checkboxOriginValue: [
				{
					_id: 'banana',
					name: 'banana',
					disabled: false,
				},
				{
					_id: 'apple',
					name: 'apple',
					disabled: false,
				},
				{
					_id: 'orange',
					name: 'orange',
					disabled: true,
				},
				{
					_id: 'grape',
					name: 'grape',
					disabled: false,
				},
				{
					_id: 'watermelon',
					name: 'watermelon',
					disabled: false,
				},
				{
					_id: 'peach',
					name: 'peach',
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

### indeterminate状态

```vue demo
<template>
  <v3-checkbox
		v-model="state.checkboxValue2"
		:indeterminate="state.checkboxIndeterminate2"
		@change="handleCheckboxChange2"
		>全选</v3-checkbox
	>
	<v3-checkbox-group
		v-model="state.checkboxValue1"
		@change="handleCheckboxChange1"
	>
		<v3-checkbox
			v-for="v in state.checkboxOriginValue1"
			:key="v._id"
			:label="v._id"
			:disabled="v.disabled"
			>{{ v.name }}</v3-checkbox
		>
	</v3-checkbox-group>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			checkboxValue1: [],
			checkboxValue2: false,
      checkboxOriginValue1: [
				{
					_id: 'banana',
					name: 'banana',
					disabled: false,
				},
				{
					_id: 'apple',
					name: 'apple',
					disabled: false,
				},
				{
					_id: 'orange',
					name: 'orange',
					disabled: false,
				},
				{
					_id: 'grape',
					name: 'grape',
					disabled: false,
				},
			],
      checkboxIndeterminate2: false,
		});

    function handleCheckboxChange1(v: string[]) {
			state.checkboxIndeterminate2 =
				v.length > 0 && v.length < state.checkboxOriginValue1.length;
			state.checkboxValue2 =
				v.length === state.checkboxOriginValue1.length;
		}

    function handleCheckboxChange2(v: boolean) {
			// 全选 or 全不选
			if (v) {
				(state
					.checkboxValue1 as string[]) = state.checkboxOriginValue1.map(
					innerV => {
						return innerV._id;
					}
				);
				state.checkboxValue2 = true;
			} else {
				state.checkboxValue1 = [];
				state.checkboxValue2 = false;
			}
			state.checkboxIndeterminate2 = false;
		}

		return {
			state,
      handleCheckboxChange1,
      handleCheckboxChange2,
		};
	},
});
</script>
```

### 限制最大/最小选择数量

```vue demo
<template>
	<v3-checkbox-group v-model="state.checkboxValue" :max="4" :min="2">
		<v3-checkbox
			v-for="v in state.checkboxOriginValue"
			:key="v._id"
			:label="v._id"
			:disabled="v.disabled"
			>{{ v.name }}</v3-checkbox
		>
	</v3-checkbox-group>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			checkboxValue: ['banana', 'orange'],
      checkboxOriginValue: [
				{
					_id: 'banana',
					name: 'banana',
					disabled: false,
				},
				{
					_id: 'apple',
					name: 'apple',
					disabled: false,
				},
				{
					_id: 'orange',
					name: 'orange',
					disabled: true,
				},
				{
					_id: 'grape',
					name: 'grape',
					disabled: false,
				},
				{
					_id: 'watermelon',
					name: 'watermelon',
					disabled: false,
				},
				{
					_id: 'peach',
					name: 'peach',
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

### 不同尺寸的复选框

```vue demo
<template>
	<v3-checkbox
		size="small"
		v-model="state.checkboxValue1"
		>小尺寸</v3-checkbox
	>
	<v3-checkbox
		size="medium"
		v-model="state.checkboxValue2"
		>中等尺寸</v3-checkbox
	>
	<v3-checkbox
		size="large"
		v-model="state.checkboxValue3"
		>大尺寸</v3-checkbox
	>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			checkboxValue1: true,
      checkboxValue2: false,
      checkboxValue3: true,
		});

		return {
			state,
		};
	},
});
</script>
```

### API

#### Checkbox 参数

| 参数名             | 说明                     | 类型                      | 可选值                 | 默认值                          |
| ------------------ | ------------------------ | ------------------------- | ---------------------- | ------------------------------- |
| border             | 是否带有边框             | boolean                   |                        | false                           |
| disabled           | 禁用状态                 | boolean                   |                        | button                          | false |
| label              | 复选框的值               | string / boolean / number |                        | ''                              |
| indeterminate      | 是否为不确定状态         | boolean                   |                        | false                           |
| selectedIcon       | 选中时的图标             | string                    |                        | v3-icon-checkbox-selected       |
| indeterminatedIcon | 不确定时的图标           | string                    |                        | v3-icon-checkbox-indeterminated |
| defaultIcon        | 未选中状态下的图标       | string                    |                        | v3-icon-checkbox-default        |
| size               | 复选框的尺寸             | string                    | small / medium / large | medium                          |
| modelValue         | 单独使用时绑定的 v-model | boolean                   | false                  |

#### Checkbox 事件

| 事件名 | 说明             | 回调参数             |
| ------ | ---------------- | -------------------- |
| change | 值发生变化时触发 | (newValue, e: Event) |

#### Checkbox 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |

#### CheckboxGroup 参数

| 参数名     | 说明               | 类型                             | 可选值 | 默认值    |
| ---------- | ------------------ | -------------------------------- | ------ | --------- |
| modelValue | v-model            | Array<string / boolean / number> |        | []        |
| min        | 限制的最小选择个数 | number / undefined               |        | undefined |
| max        | 限制的最大选择个数 | number / undefined               |        | undefined |

#### CheckboxGroup 事件

| 事件名 | 说明             | 回调参数             |
| ------ | ---------------- | -------------------- |
| change | 值发生变化时触发 | (newValue, e: Event) |

#### CheckboxGroup 插槽

| 插槽名  | 说明     | 子标签                    |
| ------- | -------- | ------------------------- |
| default | 默认插槽 | Checkbox / CheckboxButton |

#### CheckboxButton 参数

| 参数名   | 说明           | 类型                      | 可选值                 | 默认值 |
| -------- | -------------- | ------------------------- | ---------------------- | ------ |
| disabled | 是否禁用       | boolean                   |                        | false  |
| label    | 绑定的值       | number / string / boolean |                        | ''     |
| size     | 复选按钮的尺寸 | string                    | small / medium / large | medium |

#### CheckboxButton 事件

| 事件名 | 说明             | 回调参数             |
| ------ | ---------------- | -------------------- |
| change | 值发生变化时触发 | (newValue, e: Event) |

#### CheckboxButton 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |