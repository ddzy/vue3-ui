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
		<v3-col :span="4" :md="{ span: 12, push: 3, pull: 1, offset: 2 }" :lg="6" :xl="2">
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

### API

#### Row 参数

| 参数名  | 说明                                                          | 类型   | 可选值                                                                      | 默认值     |
| ------- | ------------------------------------------------------------- | ------ | --------------------------------------------------------------------------- | ---------- |
| gutter  | 行间距                                                        | number |                                                                             | 0          |
| type    | 布局类型（默认为：flexbox）                                   | string |                                                                             | flex       | flex |
| justify | 同 flex 布局的 justify-content 属性（只在 type = flex）时有效 | string | start / end / center / space-around / space-between / flex-start / flex-end | flex-start |
| align   | 同 flex 布局的 align-items 属性（只在 type = flex）时有效     | string | start / end / center / flex-start / flex-end                                | flex-start |

#### Row 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 | Col    |

#### Col 参数

| 参数名 | 说明                         | 类型            | 可选值                                                       | 默认值 |
| ------ | ---------------------------- | --------------- | ------------------------------------------------------------ | ------ |
| span   | 所占行数（总数 12）          | number          |                                                              | 0      |
| offset | 距主轴左侧偏移量             | number          |                                                              | 0      |
| push   | 相对于自身，向其右侧的偏移量 | number          |                                                              | 0      |
| pull   | 相对于自身，向其左侧的偏移量 | number          |                                                              | 0      |
| xs     | < 576px                      | number / object | { span: number; offset: number; push: number; pull: number } | 0      |
| sm     | < 768px                      | number / object | { span: number; offset: number; push: number; pull: number } | 0      |
| md     | < 992px                      | number / object | { span: number; offset: number; push: number; pull: number } | 0      |
| lg     | < 1200px                     | number / object | { span: number; offset: number; push: number; pull: number } | 0      |
| xl     | > 1201px                     | number / object | { span: number; offset: number; push: number; pull: number } | 0      |

#### Col 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
