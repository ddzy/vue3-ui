## 复选框（Checkbox）

### 基本的复选框

可以自定义是否禁用复选框、自定义图标以及添加边框

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

