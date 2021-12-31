## 栅格系统（Row、Col）

响应式断点如下：

| 屏幕宽度（px） | 参数 |
| -------------- | ---- |
| <=576          | xs   |
| <=768          | sm   |
| <=992          | md   |
| <=1200         | lg   |
| >=1201         | xl   |

### 基本的栅格

```vue demo
<template>
  <v3-row :gutter="12">
		<v3-col :span="4">
			<div :style="state.style">123</div>
		</v3-col>
		<v3-col :span="4">
			<div :style="state.style">456</div>
		</v3-col>
		<v3-col :span="4">
			<div :style="state.style">789</div>
		</v3-col>
	</v3-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const state = {
      style: {
        backgroundColor: '#f3f4f5',
        borderRadius: '6px',
        lineHeight: '50px',
      },
    };

		return {
			state,
		};
	},
});
</script>
```

### 距离主轴的偏移量

```vue demo
<template>
  <v3-row :gutter="12">
		<v3-col :span="4">
			<div :style="state.style">123</div>
		</v3-col>
		<v3-col :span="4" :offset="4">
			<div :style="state.style">456</div>
		</v3-col>
	</v3-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const state = {
      style: {
        backgroundColor: '#f3f4f5',
        borderRadius: '6px',
        lineHeight: '50px',
      },
    };

		return {
			state,
		};
	},
});
</script>
```

### 距离自身的偏移量

```vue demo
<template>
  <v3-row :gutter="12">
		<v3-col :span="4">
			<div :style="state.style">123</div>
		</v3-col>
		<v3-col :span="4" :push="1">
			<div :style="{
        ...state.style,
        backgroundColor: '#00a0ff',
      }">456</div>
		</v3-col>
    <v3-col :span="4" :pull="2">
			<div :style="{
        ...state.style,
        backgroundColor: '#63b931',
      }">789</div>
		</v3-col>
	</v3-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const state = {
      style: {
        backgroundColor: '#f3f4f5',
        borderRadius: '6px',
        lineHeight: '50px',
      },
    };

		return {
			state,
		};
	},
});
</script>
```

### 响应式

```vue demo
<template>
  <v3-row :gutter="12">
		<v3-col :span="4" :md="8">
			<div :style="state.style">123</div>
		</v3-col>
		<v3-col :span="4" :md="12" :lg="6" :xl="2">
			<div :style="state.style">456</div>
		</v3-col>
    <v3-col :span="4" :md="8">
			<div :style="state.style">789</div>
		</v3-col>
	</v3-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const state = {
      style: {
        backgroundColor: '#f3f4f5',
        borderRadius: '6px',
        lineHeight: '50px',
      },
    };

		return {
			state,
		};
	},
});
</script>
```