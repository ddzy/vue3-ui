## 进度（Progress）

### 基本的线性进度条

```vue demo
<template>
  <div style="display: inline-block">
    <v3-progress-linear
      width="200px"
      :percent="state.percent"
    ></v3-progress-linear>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      percent: 10,
    });
    const app = getCurrentInstance().proxy;

		return {
			state,
		};
	},
});
</script>
```

### 多个选项用来配置进度条的外观

```vue demo
<template>
  <div style="display: inline-block">
    <v3-progress-linear
      :percent="state.percent"
      trackColor="green"
      doneTrackColor="blue"
      width="100px"
      trackWidth="12px"
    ></v3-progress-linear>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      percent: 10,
    });
    const app = getCurrentInstance().proxy;

		return {
			state,
		};
	},
});
</script>
```

### 内置多种主题

```vue demo
<template>
  <v3-progress-linear
    theme="primary"
    :percent="state.percent1"
    :formatLabel="() => 'primary'"
  ></v3-progress-linear>
  <v3-progress-linear
    theme="success"
    :percent="state.percent2"
    :formatLabel="() => 'success'"
  ></v3-progress-linear>
  <v3-progress-linear
    theme="danger"
    :percent="state.percent3"
    :formatLabel="() => 'danger'"
  ></v3-progress-linear>
  <v3-progress-linear
    theme="warning"
    :percent="state.percent4"
    :formatLabel="() => 'warning'"
  ></v3-progress-linear>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      percent1: 10,
      percent2: 20,
      percent3: 30,
      percent4: 40,
    });
    const app = getCurrentInstance().proxy;

		return {
			state,
		};
	},
});
</script>
```

### 和Slider结合使用示例

```vue demo
<template>
  <v3-progress-linear :percent="state.percent"></v3-progress-linear>
  <v3-slider v-model="state.percent"></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      percent: 10,
    });
    const app = getCurrentInstance().proxy;

		return {
			state,
		};
	},
});
</script>
```

### 基本的进度环

```vue demo
<template>
  <v3-progress-circular :percent="state.percent"></v3-progress-circular>
  <v3-progress-circular
    theme="danger"
    :percent="state.percent"
    :rotate="-180"
  ></v3-progress-circular>
  <v3-progress-circular
    theme="success"
    :percent="state.percent"
    :rotate="-270"
  ></v3-progress-circular>
  <v3-slider v-model="state.percent"></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      percent: 10,
    });
    const app = getCurrentInstance().proxy;

		return {
			state,
		};
	},
});
</script>
```

### API

#### ProgressLinear参数

| 参数名         | 说明                         | 类型     | 可选值                                | 默认值               | 是否必填 |
| -------------- | ---------------------------- | -------- | ------------------------------------- | -------------------- | -------- |
| percent        | 已完成的进度（百分比）       | number   |                                       |                      | true     |
| theme          | 进度条的主题（内置四种主题） | string   | custom/primary/success/danger/warning | custom               |          |
| trackWidth     | 进度条线条的宽度             | string   |                                       | 6px                  |          |
| trackColor     | 轨道的背景色                 | string   |                                       | #e5e6eb              |          |
| doneTrackColor | 已完成进度的背景色           | string   |                                       | rgba(0, 160, 255, 1) |          |
| showLabel      | 是否显示 label               | boolean  |                                       | true                 |          |
| formatLabel    | 自定义 label 的显示文本      | function |                                       | null                 |          |
| width          | 进度条的宽度                 | string   |                                       | 100%                 |          |
| animation      | 是否开启进度条的阴影动画     | boolean  |                                       | true                 |          |
| round          | 是否开启圆角                 | boolean  |                                       | true                 |          |
| roundLength    | 圆角大小                     | string   |                                       | 100px                |          |

#### ProgressLinear事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |

#### ProgressLinear插槽

| 插槽名 | 说明 | 子标签 |
| ------ | ---- | ------ |

#### ProgressCircular参数

| 参数名         | 说明                         | 类型     | 可选值                                | 默认值               | 是否必填 |
| -------------- | ---------------------------- | -------- | ------------------------------------- | -------------------- | -------- |
| percent        | 已完成的进度（百分比）       | number   |                                       |                      | true     |
| theme          | 进度条的主题（内置四种主题） | string   | custom/primary/success/danger/warning | custom               |          |
| trackWidth     | 进度条线条的宽度             | number   |                                       | 6                    |          |
| trackColor     | 轨道的背景色                 | string   |                                       | #e5e6eb              |          |
| doneTrackColor | 已完成进度的背景色           | string   |                                       | rgba(0, 160, 255, 1) |          |
| showLabel      | 是否显示 label               | boolean  |                                       | true                 |          |
| formatLabel    | 自定义 label 的显示文本      | function |                                       | null                 |          |
| radius         | 进度环半径                   | number   |                                       | 50                   |          |
| rotate         | 进度环摆放的角度             | number   |                                       | -90                  |          |

#### ProgressCircular事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |

#### ProgressCircular插槽

| 插槽名 | 说明 | 子标签 |
| ------ | ---- | ------ |