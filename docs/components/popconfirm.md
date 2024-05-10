# 气泡确认框 Popconfirm

## 基本用法

:::demo

```vue
<template>
	<div style="display: inline-block">
		<v3-popconfirm
			content="确定要删除吗？"
			trigger="manual"
			v-model="state.popconfirmValue"
			:confirmBtnLoading="state.popconfirmConfirmBtnLoading"
			@confirm="handleConfirm"
			@cancel="handleCancel"
		>
			<v3-button
				type="danger"
				@click="state.popconfirmValue = !state.popconfirmValue"
				>删除</v3-button
			>
		</v3-popconfirm>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			popconfirmValue: false,
			popconfirmConfirmBtnLoading: false,
		});
		const app = getCurrentInstance().proxy;

		function handleConfirm() {
			state.popconfirmConfirmBtnLoading = true;

			setTimeout(() => {
				app.$message({
					type: 'success',
					message: '删除成功~',
				});
				state.popconfirmConfirmBtnLoading = false;
				state.popconfirmValue = false;
			}, 1000);
		}

		function handleCancel() {
			state.popconfirmValue = false;
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

## 自定义图标和图标颜色

:::demo

```vue
<template>
	<div style="display: inline-block">
		<v3-popconfirm
			content="要隐藏当前文章吗？"
			trigger="click"
			icon="v3-icon-Notvisible"
			iconColor="rgba(201, 27, 38, 1)"
			placement="bottom"
		>
			<v3-button type="primary" circle icon="v3-icon-Notvisible"></v3-button>
		</v3-popconfirm>
	</div>
</template>
```

:::

## 自定义按钮的类型、大小、文本内容

:::demo

```vue
<template>
	<v3-space :size="12">
		<v3-popconfirm
			content="确定要删除吗？"
			trigger="click"
			placement="bottom"
			confirmBtnType="success"
			cancelBtnType="default"
			cancelBtnSize="small"
		>
			<v3-button type="primary">类型</v3-button>
		</v3-popconfirm>

		<v3-popconfirm
			content="确定要删除吗？"
			trigger="click"
			placement="bottom"
			confirmBtnSize="small"
		>
			<v3-button type="primary">大小</v3-button>
		</v3-popconfirm>

		<v3-popconfirm
			content="确定要删除吗？"
			trigger="click"
			placement="bottom"
			cancelBtnText="不用了"
			confirmBtnText="继续"
		>
			<v3-button type="primary">内容</v3-button>
		</v3-popconfirm>
	</v3-space>
</template>
```

:::

## API

### Popconfirm Props

| 参数名            | 说明                    | 类型    | 可选值                                           | 默认值                | 是否必填 |
| ----------------- | ----------------------- | ------- | ------------------------------------------------ | --------------------- | -------- |
| theme             | 主题                    | string  | light/dark                                       | light                 |          |
| title             | 标题                    | string  |                                                  |                       |          |
| content           | 气泡确认框的内容        | string  |                                                  |                       |          |
| confirmBtnText    | 确定按钮的文字          | string  |                                                  | 确定                  |          |
| confirmBtnType    | 确定按钮的类型          | string  | primary/success/danger/default/warning/info/text | primary               |          |
| confirmBtnSize    | 确定按钮的大小          | string  | small/medium/large                               | small                 |          |
| confirmBtnLoading | 确定按钮的 loading 状态 | boolean |                                                  | false                 |          |
| cancelBtnSize     | 取消按钮的大小          | string  | small/medium/large                               | medium                |          |
| cancelBtnText     | 取消按钮的文字          | string  |                                                  | 取消                  |          |
| cancelBtnType     | 取消按钮的类型          | string  | primary/success/danger/default/warning/info/text | text                  |          |
| cancelBtnLoading  | 取消按钮的 loading 状态 | boolean |                                                  | false                 |          |
| icon              | 图标类名                | string  |                                                  | v3-icon-warning-fill  |          |
| iconColor         | 图标颜色                | string  |                                                  | rgba(237, 170, 83, 1) |          |
| showIcon          | 是否显示图标            | boolean |                                                  | true                  |          |

### Popconfirm Events

| 事件名  | 说明               | 回调参数 |
| ------- | ------------------ | -------- |
| confirm | 点击确定按钮时触发 |          |
| cancel  | 点击取消按钮时触发 |          |

### Popconfirm Slots

| 插槽名  | 说明             | 子标签 |
| ------- | ---------------- | ------ |
| default | 触发器           |        |
| content | 气泡确认框的内容 |        |
