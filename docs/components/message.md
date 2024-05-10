# 消息提示 Message

## 基本用法

:::demo

```vue
<template>
	<v3-space :size="12">
		<v3-button type="success" @click="handleClick('success')">成功</v3-button>
		<v3-button type="danger" @click="handleClick('danger')">失败</v3-button>
		<v3-button type="warning" @click="handleClick('warning')">警告</v3-button>
		<v3-button type="info" @click="handleClick('info')">提示</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		function handleClick(type: string) {
			app &&
				app.proxy.$message({
					type,
					message: `这是一条 ${type} 消息`,
					duration: 1000,
				});
		}

		return {
			state,
			handleClick,
		};
	},
});
</script>
```

:::

## 内容可以是 VNode

:::demo

```vue
<template>
	<v3-space :size="12">
		<v3-button type="success" @click="handleClick">成功</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		function handleClick() {
			app &&
				app.proxy.$message({
					type: 'success',
					message: h(
						'span',
						{
							style: {
								color: 'red',
							},
						},
						'内容可以是 VNode~',
					),
				});
		}

		return {
			state,
			handleClick,
		};
	},
});
</script>
```

:::

## 可以手动关闭

:::demo

```vue
<template>
	<v3-space :size="12">
		<v3-button type="success" @click="handleClick">成功</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		function handleClick() {
			app &&
				app.proxy.$message({
					type: 'success',
					message: '可以手动关闭',
					showClose: true,
					duration: 0,
				});
		}

		return {
			state,
			handleClick,
		};
	},
});
</script>
```

:::

## 文本居中

:::demo

```vue
<template>
	<v3-space :size="12">
		<v3-button type="success" @click="handleClick">成功</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		function handleClick() {
			app &&
				app.proxy.$message({
					type: 'success',
					message: '文本居中',
					center: true,
				});
		}

		return {
			state,
			handleClick,
		};
	},
});
</script>
```

:::

## 可以传入 HTML 片段

:::demo

```vue
<template>
	<v3-space :size="12">
		<v3-button type="success" @click="handleClick">成功</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		function handleClick() {
			app &&
				app.proxy.$message({
					type: 'success',
					message: `
					<p>可以传入 <mark>HTML</mark> 片段~</p>
				`,
					dangerouslyUseHTMLString: true,
				});
		}

		return {
			state,
			handleClick,
		};
	},
});
</script>
```

:::

## 可通过 onClose 事件来阻止关闭

:::demo

```vue
<template>
	<v3-space :size="12">
		<v3-button type="success" @click="handleClick">成功</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({});
		const app = ref(getCurrentInstance()).value;

		function handleClick() {
			app &&
				app.proxy.$message({
					type: 'success',
					message: `
					可通过 <mark>onClose</mark> 方法阻止关闭~
				`,
					dangerouslyUseHTMLString: true,
					onClose(done) {
						setTimeout(() => {
							done();
						}, 2000);
					},
				});
		}

		return {
			state,
			handleClick,
		};
	},
});
</script>
```

:::

## API

### Message Props

| 参数名                   | 说明                                                                    | 类型     | 可选值                            | 默认值 |
| ------------------------ | ----------------------------------------------------------------------- | -------- | --------------------------------- | ------ |
| duration                 | 持续时间（ms）                                                          | number   |                                   | 3000   |
| type                     | 消息框的类型                                                            | string   | success / warning / info / danger | info   |
| message                  | 消息内容                                                                | string   |                                   |        |
| icon                     | 自定义图标                                                              | string   |                                   |        |
| dangerouslyUseHTMLString | 是否把 message 作为 HTML 渲染                                           | boolean  |                                   | false  |
| customClass              | 自定义消息框的类名                                                      | string   |                                   |        |
| showClose                | 是否显示关闭按钮                                                        | boolean  |                                   | true   |
| center                   | 弹窗框内的文本是否居中                                                  | boolean  |                                   | false  |
| offset                   | 弹窗框距离窗口顶部的距离                                                | number   |                                   | 20     |
| closeOnHover             | 鼠标移到消息框上时，是否依然要关闭                                      | boolean  |                                   | false  |
| onClose                  | 关闭时触发的事件，返回 `Promise<true>` 或者 `true` 时消息框永远不会关闭 | function |                                   |        |
