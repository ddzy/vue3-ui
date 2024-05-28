# Back 返回

## 基本用法

:::demo

```vue
<template>
	<div style="position: relative; width: 500px; ">
		<div ref="targetRef" style="overflow: auto; height: 300px;">
			<ul>
				<li v-for="v in 200">{{ v }}</li>
			</ul>
		</div>
		<v3-back :target="targetRef"></v3-back>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const targetRef = ref(null);

		return {
			state,
			targetRef,
		};
	},
});
</script>
```

:::

## 控制是否显示去顶部/去底部按钮

:::demo

```vue
<template>
	<v3-row>
		<v3-col :span="6">
			<div style="position: relative;">
				<div ref="targetRef1" style="overflow: auto; height: 300px;">
					<ul>
						<li v-for="v in 200">{{ v }}</li>
					</ul>
				</div>
				<v3-back disableToTop :target="targetRef1"></v3-back>
			</div>
		</v3-col>
		<v3-col :span="6">
			<div style="position: relative;">
				<div ref="targetRef2" style="overflow: auto; height: 300px;">
					<ul>
						<li v-for="v in 200">{{ v }}</li>
					</ul>
				</div>
				<v3-back disableToBottom :target="targetRef2"></v3-back>
			</div>
		</v3-col>
	</v3-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const targetRef1 = ref(null);
		const targetRef2 = ref(null);

		return {
			state,
			targetRef1,
			targetRef2,
		};
	},
});
</script>
```

:::

## 自定义去顶部/去底部按钮

:::demo

```vue
<template>
	<div style="position: relative; width: 500px; ">
		<div ref="targetRef" style="overflow: auto; height: 300px;">
			<ul>
				<li v-for="v in 200">{{ v }}</li>
			</ul>
		</div>
		<v3-back :target="targetRef">
			<template #top>
				<div
					style="text-align: center; width: 30px; height: 30px; background-color: #daa520; color: #fff; border-radius: 50%; line-height: 30px; cursor: pointer;"
				>
					↑
				</div>
			</template>
			<template #bottom>
				<div
					style="text-align: center; width: 30px; height: 30px; background-color: #daa520; color: #fff; border-radius: 50%; line-height: 30px; cursor: pointer;"
				>
					↓
				</div>
			</template>
		</v3-back>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const targetRef = ref(null);

		return {
			state,
			targetRef,
		};
	},
});
</script>
```

:::

## API

### Back Props

| 参数名          | 说明                                 | 类型    | 可选值             | 默认值 | 是否必填 |
| --------------- | ------------------------------------ | ------- | ------------------ | ------ | -------- |
| distance        | 页面滚动距离超过该值时显示去顶部按钮 | number  |                    | 400    | false    |
| disableToTop    | 是否禁用（即不显示）“去顶部”按钮     | boolean |                    | false  | false    |
| disableToBottom | 是否禁用（即不显示）“去底部”按钮     | boolean |                    | false  | false    |
| target          | 滚动容器                             | object  | HTMLElement/Window | window | false    |

### Back Slots

| 插槽名  | 说明     | 子标签   |
| ------- | -------- | -------- |
| default | 默认插槽 | 主要内容 |
