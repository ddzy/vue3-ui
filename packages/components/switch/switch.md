## 开关（Switch）

### 基本用法

```vue demo
<template>
	<v3-switch v-model="state.switchValue"></v3-switch>
	<v3-switch v-model="state.switchValue2" style="margin-top: 20px" :disabled="true"></v3-switch>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			switchValue: true,
			switchValue2: false,
    });

		return {
			state,
		};
	},
});
</script>
```

### 自定义颜色

```vue demo
<template>
	<v3-switch v-model="state.switchValue" activeColor="#00A0FF" inactiveColor="#B8B0B0"></v3-switch>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			switchValue: true,
    });

		return {
			state,
		};
	},
});
</script>
```

### 在不同状态下显示的文本

```vue demo
<template>
	<v3-switch v-model="state.switchValue" activeLabel="开" inactiveLabel="关"></v3-switch>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			switchValue: true,
    });

		return {
			state,
		};
	},
});
</script>
```

### 可以用图标代替文本

```vue demo
<template>
	<v3-switch v-model="state.switchValue" activeLabel="开" inactiveLabel="关" activeIcon="v3-icon-notice" inactiveIcon="v3-icon-sound-Mute"></v3-switch>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			switchValue: true,
    });

		return {
			state,
		};
	},
});
</script>
```

### 可以绑定多种类型的值（string、boolean、number）

```vue demo
<template>
	<v3-row>
		<v3-col :span="12">
			<v3-switch
				v-model="state.switchValue"
				activeLabel="1"
				inactiveLabel="0"
				:activeValue="1"
				:inactiveValue="0"
				@change="handleChange"
			></v3-switch>
		</v3-col>
		<v3-col style="margin: 12px 0;" :span="12">
			<v3-switch
				v-model="state.switchValue2"
				activeLabel="Beijing"
				inactiveLabel="Shanghai"
				:activeValue="'Beijing'"
				:inactiveValue="'Shanghai'"
				@change="handleChange"
			></v3-switch>
		</v3-col>
		<v3-col :span="12">
			<span>选中的值为：{{ state.selectedValue }}</span>
		</v3-col>
	</v3-row>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			switchValue: 1,
			switchValue2: 'Shanghai',
			selectedValue: '',
    });

		function handleChange(v: any) {
			state.selectedValue = v;
		}

		return {
			state,
			handleChange,
		};
	},
});
</script>
```

### API

#### Switch 参数

| 参数名 | 说明 | 类型 | 可选值 | 默认值 |
| ------ | ---- | ---- | ------ | ------ |
|        |      |      |        |        |

#### Switch 事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |

#### Switch 插槽

| 插槽名 | 说明 | 子标签 |
| ------ | ---- | ------ |
|        |      |        |