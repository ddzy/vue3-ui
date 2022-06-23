## Card（卡片）

### 基本用法

```vue demo
<template>
  <v3-card title="标题">
    <v3-space :size="12">
      <v3-button type="primary">按钮1</v3-button>
      <v3-button type="primary">按钮2</v3-button>
      <v3-button type="primary">按钮3</v3-button>
      <v3-button type="primary">按钮4</v3-button>
      <v3-button type="primary">按钮5</v3-button>
      <v3-button type="primary">按钮6</v3-button>
      <v3-button type="primary">按钮7</v3-button>
      <v3-button type="primary">按钮8</v3-button>
      <v3-button type="primary">按钮9</v3-button>
    </v3-space>
  </v3-card>
</template>
```

### 控制卡片阴影大小

```vue demo
<template>
  <v3-radio-group v-model="state.radioValue">
    <v3-radio label="small">小</v3-radio>
    <v3-radio label="medium">中</v3-radio>
    <v3-radio label="large">大</v3-radio>
  </v3-radio-group>
  <v3-card title="标题" :shadowSize="state.radioValue">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
    facilis blanditiis excepturi, repellat similique animi, architecto
    placeat obcaecati tempore esse et perferendis error at vel voluptate
    recusandae quae doloremque sint.
  </v3-card>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      radioValue: 'small',
    });

		return {
			state,
		};
	},
});
</script>
```

### 何时显示卡片阴影

```vue demo
<template>
  <v3-radio-group v-model="state.radioValue">
    <v3-radio label="hover">hover</v3-radio>
    <v3-radio label="alway">alway</v3-radio>
    <v3-radio label="never">never</v3-radio>
  </v3-radio-group>
  <v3-card title="标题" :shadowTrigger="state.radioValue">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
    facilis blanditiis excepturi, repellat similique animi, architecto
    placeat obcaecati tempore esse et perferendis error at vel voluptate
    recusandae quae doloremque sint.
  </v3-card>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      radioValue: 'hover',
    });

		return {
			state,
		};
	},
});
</script>
```

### 自定义内容区的样式，显示多种风格的卡片

```vue demo
<template>
  <v3-card
    :bodyStyle="{
      padding: 0,
    }"
  >
    <div class="img" style="height: 200px;background: url('https://oos.yyge.top/test%2Fimages%2F1.jpg') no-repeat center
		center / cover;
	background-image: url('https://oos.yyge.top/test%2Fimages%2F1.jpg');"></div>

    <template #footer>
      <div class="action" style="display: flex;
	align-items: center;
	justify-content: space-between;">
        <div class="action__tip">
          美丽的风景~
        </div>
        <div class="action__btn">
          <v3-button type="text">查看详情</v3-button>
        </div>
      </div>
    </template>
  </v3-card>
</template>
```

### API

#### Card参数

| 参数名        | 说明                                    | 类型   | 可选值             | 默认值 | 必填 |
| ------------- | --------------------------------------- | ------ | ------------------ | ------ | ---- |
| title         | 卡片标题（可通过 slot="header" 自定义） | string |                    |        |      |
| bodyStyle     | 自定义卡片内容区的样式                  | object |                    | {}     |      |
| shadowTrigger | 何时显示卡片阴影                        | string | alway/hover/never  | alway  |      |
| shadowSize    | 卡片阴影的大小                          | string | small/medium/large | small  |      |


#### Card事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
|        |      |          |

#### Card插槽

| 插槽名  | 说明       | 子标签 |
| ------- | ---------- | ------ |
| default | 默认插槽   |        |
| header  | 自定义头部 |        |
| footer  | 自定义尾部 |        |