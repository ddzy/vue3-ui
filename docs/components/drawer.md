# 抽屉 Drawer

## 基本用法

:::demo

```vue
<template>
	<v3-button type="primary" @click="state.showDrawer = !state.showDrawer"
		>点我</v3-button
	>
	<v3-drawer
		v-model="state.showDrawer"
		placement="top"
		title="标题"
		confirmText="确定"
		cancelText="关闭"
		:confirmLoading="state.drawerLoading"
		:onConfirm="handleConfirm"
		:onCancel="handleCancel"
	>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto iusto
		sequi pariatur quaerat numquam, nulla minus recusandae voluptatibus,
		reprehenderit voluptate quos quisquam at ratione illum ipsa id a ducimus
		quam? Placeat minus, soluta quas, asperiores consequatur reprehenderit
		repellendus veritatis aperiam sit debitis error reiciendis quos accusamus
		et, dicta assumenda nesciunt exercitationem alias praesentium voluptatum?
		Beatae accusamus sit voluptatum facere assumenda!
	</v3-drawer>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showDrawer: false,
			drawerLoading: false,
		});

		function handleConfirm() {
			state.drawerLoading = true;
			setTimeout(() => {
				state.drawerLoading = false;
				state.showDrawer = false;
			}, 3000);
		}

		function handleCancel(done: Function) {
			done();
		}

		return {
			state,
			handleConfirm,
			handleCancel,
		};
	},
});
</script>
```

:::

## 不同方向

:::demo

```vue
<template>
	<v3-radio-group v-model="state.placement">
		<v3-radio label="left">左</v3-radio>
		<v3-radio label="bottom">下</v3-radio>
		<v3-radio label="right">右</v3-radio>
		<v3-radio label="top">上</v3-radio>
	</v3-radio-group>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-button type="primary" @click="state.showDrawer = !state.showDrawer"
		>打开</v3-button
	>
	<v3-drawer
		v-model="state.showDrawer"
		title="标题"
		:placement="state.placement"
	>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto iusto
		sequi pariatur quaerat numquam, nulla minus recusandae voluptatibus,
		reprehenderit voluptate quos quisquam at ratione illum ipsa id a ducimus
		quam? Placeat minus, soluta quas, asperiores consequatur reprehenderit
		repellendus veritatis aperiam sit debitis
	</v3-drawer>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showDrawer: false,
			placement: 'right',
		});
		return {
			state,
		};
	},
});
</script>
```

:::

## API

### Drawer Props

| 参数名               | 说明                                               | 类型          | 可选值                | 默认值                     |
| -------------------- | -------------------------------------------------- | ------------- | --------------------- | -------------------------- |
| placement            | 抽屉弹出的位置                                     | string        | top/left/bottom/right | right                      |
| title                | 抽屉标题，也可通过 slot=header 指定                | string        |                       |                            |
| showBackdrop         | 是否显示遮罩层                                     | boolean       |                       | true                       |
| showClose            | 是否显示关闭按钮                                   | boolean       |                       | true                       |
| closeOnClickBackdrop | 点击遮罩层是否关闭抽屉                             | boolean       |                       | true                       |
| confirmText          | 确定按钮的文案                                     | string        |                       | 确定                       |
| cancelText           | 取消按钮的文案                                     | string        |                       | 取消                       |
| showConfirm          | 是否显示确定按钮                                   | boolean       |                       | true                       |
| showCancel           | 是否显示取消按钮                                   | boolean       |                       | true                       |
| confirmLoading       | 确定按钮的 loading 状态                            | boolean       |                       | false                      |
| width                | 抽屉的宽度（当 placement 为 left/right 时有效      | string/number |                       | 250                        |
| height               | 抽屉的高度（当 placement 为 top/bottom 时有效      | string/number |                       | auto                       |
| onConfirm            | 点击确认按钮时的回调                               | function      |                       | null                       |
| onCancel             | 点击取消按钮时的回调（需手动调用 done 来关闭弹窗） | function      |                       | (done: Function) => done() |

### Drawer Slots

| 插槽名  | 说明           | 子标签   |
| ------- | -------------- | -------- |
| default | 默认插槽       | 主要内容 |
| header  | 自定义头部内容 |          |
| footer  | 自定义尾部内容 |          |
