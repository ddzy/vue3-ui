## Tooltip（工具提示）

### 基本用法

```vue demo
<template>
  <v3-row justify="center" :gutter="20">
    <v3-col>
      <v3-tooltip
        content="我是上左的内容。。。。。。"
        placement="top-start"
        v-model="state.showTopStart"
      >
        <v3-button plain>上左</v3-button>
      </v3-tooltip>
    </v3-col>
    <v3-col>
      <v3-tooltip content="上中" placement="top" v-model="state.showTop">
        <v3-button plain>上中</v3-button>
      </v3-tooltip>
    </v3-col>
    <v3-col>
      <v3-tooltip
        content="上右"
        placement="top-end"
        v-model="state.showTopEnd"
      >
        <v3-button plain>上右</v3-button>
      </v3-tooltip>
    </v3-col>
  </v3-row>
  <v3-row justify="space-between" :gutter="20">
    <v3-col>
      <v3-row justify="space-around" :gutter="20">
        <v3-col :span="12">
          <v3-tooltip
            content="左上"
            placement="left-start"
            v-model="state.showLeftStart"
          >
            <v3-button plain>左上</v3-button>
          </v3-tooltip>
        </v3-col>
        <v3-col style="margin-top: 20px" :span="12">
          <v3-tooltip
            content="左中"
            placement="left"
            v-model="state.showLeft"
          >
            <v3-button plain>左中</v3-button>
          </v3-tooltip>
        </v3-col>
        <v3-col style="margin-top: 20px" :span="12">
          <v3-tooltip
            content="左下"
            placement="left-end"
            v-model="state.showLeftEnd"
          >
            <v3-button plain>左下</v3-button>
          </v3-tooltip>
        </v3-col>
      </v3-row>
    </v3-col>
    <v3-col>
      <v3-row
        style="text-align: right;"
        justify="space-around"
        :gutter="20"
      >
        <v3-col :span="12">
          <v3-tooltip
            content="右上"
            placement="right-start"
            v-model="state.showRightStart"
          >
            <v3-button plain>右上</v3-button>
          </v3-tooltip>
        </v3-col>
        <v3-col style="margin-top: 20px" :span="12">
          <v3-tooltip
            content="右中"
            placement="right"
            v-model="state.showRight"
          >
            <v3-button plain>右中</v3-button>
          </v3-tooltip>
        </v3-col>
        <v3-col style="margin-top: 20px" :span="12">
          <v3-tooltip
            content="右下"
            placement="right-end"
            v-model="state.showRightEnd"
          >
            <v3-button plain>右下</v3-button>
          </v3-tooltip>
        </v3-col>
      </v3-row>
    </v3-col>
  </v3-row>
  <v3-row justify="center" :gutter="20">
    <v3-col>
      <v3-tooltip
        content="下左"
        placement="bottom-start"
        v-model="state.showBottomStart"
      >
        <v3-button plain>下左</v3-button>
      </v3-tooltip>
    </v3-col>
    <v3-col>
      <v3-tooltip
        content="下中"
        placement="bottom"
        v-model="state.showBottom"
      >
        <v3-button plain>下中</v3-button>
      </v3-tooltip>
    </v3-col>
    <v3-col>
      <v3-tooltip
        content="下右"
        placement="bottom-end"
        v-model="state.showBottomEnd"
      >
        <v3-button plain>下右</v3-button>
      </v3-tooltip>
    </v3-col>
  </v3-row>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
    });

		return {
			state,
		};
	},
});
</script>
```


### 可通过`slot='content`传入自定义内容

```vue demo
<template>
  <v3-tooltip trigger="mouseenter" style="display: inline-block">
    <v3-button plain>鼠标移上来</v3-button>
    <template #content>
      <p style="margin: 0; word-break: break-all">
        听过这样一句话，并不是每一条鱼，都生活在同一片海里。每个人都有自己的幸福阈值，如鱼饮水，冷暖自知。若用自己的经验随意去评价他人的生活，只会给彼此带来麻烦和困扰
      </p>
    </template>
  </v3-tooltip>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
    });

		return {
			state,
		};
	},
});
</script>
```

### 禁用状态

```vue demo
<template>
  <v3-tooltip trigger="mouseenter" style="display: inline-block" disabled>
    <v3-button plain>鼠标移上来</v3-button>
    <template #content>
      <p style="margin: 0; word-break: break-all">
        听过这样一句话，并不是每一条鱼，都生活在同一片海里。每个人都有自己的幸福阈值，如鱼饮水，冷暖自知。若用自己的经验随意去评价他人的生活，只会给彼此带来麻烦和困扰
      </p>
    </template>
  </v3-tooltip>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
    });

		return {
			state,
		};
	},
});
</script>
```

### 自定义弹出菜单距离触发器的距离

```vue demo
<template>
  <v3-tooltip trigger="mouseenter" style="display: inline-block" :offset="[0, 20]">
    <v3-button plain>鼠标移上来</v3-button>
    <template #content>
      <p style="margin: 0; word-break: break-all">
        听过这样一句话，并不是每一条鱼，都生活在同一片海里。每个人都有自己的幸福阈值，如鱼饮水，冷暖自知。若用自己的经验随意去评价他人的生活，只会给彼此带来麻烦和困扰
      </p>
    </template>
  </v3-tooltip>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
    });

		return {
			state,
		};
	},
});
</script>
```

### 控制tooltip显示/隐藏的延时

```vue demo
<template>
  <v3-tooltip trigger="mouseenter" style="display: inline-block" :delay="[1000, 1000]">
    <v3-button plain>鼠标移上来</v3-button>
    <template #content>
      <p style="margin: 0; word-break: break-all">
        听过这样一句话，并不是每一条鱼，都生活在同一片海里。每个人都有自己的幸福阈值，如鱼饮水，冷暖自知。若用自己的经验随意去评价他人的生活，只会给彼此带来麻烦和困扰
      </p>
    </template>
  </v3-tooltip>
</template>
```

### API

#### Switch 参数

> 其它参数同 `BasePopper`

| 参数名 | 说明 | 类型   | 可选值 | 默认值 | 必填 |
| ------ | ---- | ------ | ------ | ------ | ---- |
| title  | 标题 | string |        |        |      |
| ...    | ...  | ...    | ...    | ...    | ...  |

#### Switch 事件

> 同 `BasePopper`

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| ...    | ...  | ...      |

#### Switch 插槽

> 同 `BasePopper`

| 插槽名 | 说明 | 子标签 |
| ------ | ---- | ------ |
| ...    | ...  | ...    |