## 标题（Tag）

### 基本标签

```vue demo
<template>
  <v3-tag type="primary">primary</v3-tag>
  <v3-tag type="success">success</v3-tag>
  <v3-tag type="danger">danger</v3-tag>
  <v3-tag type="warning">warning</v3-tag>
  <v3-tag type="info">info</v3-tag>
</template>
```

### 三种尺寸

```vue demo
<template>
  <v3-tag type="primary" size="small">small</v3-tag>
  <v3-tag type="success" size="medium">medium</v3-tag>
  <v3-tag type="danger" size="large">large</v3-tag>
</template>
```

### 填充主题

```vue demo
<template>
  <v3-tag type="primary" :plain="false">primary</v3-tag>
  <v3-tag type="success" :plain="false">success</v3-tag>
  <v3-tag type="danger" :plain="false">danger</v3-tag>
  <v3-tag type="warning" :plain="false">warning</v3-tag>
  <v3-tag type="info" :plain="false">info</v3-tag>
</template>
```

### 可以手动关闭

```vue demo
<template>
  <v3-tag type="primary" :closeable="true" @close="handleClose">primary</v3-tag>
  <v3-tag type="success" :closeable="true" @close="handleClose">success</v3-tag>
  <v3-tag type="danger" :closeable="true" @close="handleClose">danger</v3-tag>
  <v3-tag type="warning" :closeable="true" @close="handleClose">warning</v3-tag>
  <v3-tag type="info" :closeable="true" @close="handleClose">info</v3-tag>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({	});

    function handleClose() {
			console.log('已关闭');
		}

		return {
			state,
      handleClose,
		};
	},
});
</script>
```

### 自定义背景色和文本颜色

```vue demo
<template>
  <v3-tag color="#fff" backgroundColor="#1890ff" closeable>标签1</v3-tag>
  <v3-tag
    color="#fff"
    backgroundColor="rgba(218, 112, 214, .5)"
    borderColor="rgba(218, 112, 214, 1)"
    >标签2</v3-tag
  >
</template>
```

### API

#### Tag 参数

| 参数名          | 说明                                 | 类型    | 可选值                              | 默认值  |
| --------------- | ------------------------------------ | ------- | ----------------------------------- | ------- |
| type            | 标签的类型（与 `V3Button` 大体相同） | string  | primary/success/danger/warning/info | primary |
| closeable       | 是否可关闭标签                       | boolean |                                     | false   |
| plain           | 是否为朴素标签（与 V3Button 相同）   | boolean |                                     | true    |
| size            | 标签尺寸                             | string  | small/medium/large                  | medium  |
| backgroundColor | 自定义标签的背景色                   | string  |                                     |         |
| color           | 自定义标签的文字颜色                 | string  |                                     |         |
| borderColor     | 自定义标签的边框颜色                 | string  |                                     |         |
| animation       | 是否开启动画                         | boolean |                                     | true    |

#### Tag 事件

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| close  | 关闭时触发 |          |

#### Tag 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
