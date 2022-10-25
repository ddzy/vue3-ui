## Popover（弹出消息）

### 基本用法

```vue demo
<template>
  <v3-popover
    content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
    title="标题"
    trigger="mouseenter"
    theme="light"
    style="display: inline-block"
  >
    <v3-button>mouseenter</v3-button>
  </v3-popover>

  <v3-divider></v3-divider>

  <v3-popover
    content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
    title="标题"
    trigger="focusin"
    theme="light"
    style="display: inline-block"
  >
    <v3-button>focusin</v3-button>
  </v3-popover>

  <v3-divider></v3-divider>

  <v3-popover
    content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
    title="标题"
    trigger="click"
    theme="light"
    style="display: inline-block"
  >
    <v3-button>click</v3-button>
  </v3-popover>

  <v3-divider></v3-divider>

  <v3-popover
    v-model="state.popoverValue"
    content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
    title="标题"
    trigger="manual"
    theme="light"
    style="display: inline-block"
  >
    <v3-button @click="state.popoverValue = true">manual</v3-button>
  </v3-popover>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      popoverValue: false,
    });

		return {
			state,
		};
	},
});
</script>
```

### 两种主题

```vue demo
<template>
  <v3-popover
    content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
    title="标题"
    trigger="mouseenter"
    theme="light"
    placement="bottom"
    style="display: inline-block"
  >
    <v3-button>明亮主题</v3-button>
  </v3-popover>
  <v3-divider direction="vertical"></v3-divider>
  <v3-popover
    content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
    title="标题"
    trigger="mouseenter"
    theme="dark"
    placement="bottom"
    style="display: inline-block"
  >
    <v3-button>暗黑主题</v3-button>
  </v3-popover>
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
  <v3-popover
    content="我们都是青春曾经领养的孩子，你哭他笑，我玩着一个童年的布娃娃，一不小心跌倒，感染人生第一场抑郁，又开始学会做爱情的美梦，最后醒来时，你就突然跟身边的人发出疑问：我们什么时候长这么大的？而就在这个时候或者更早，青春不动声色地拿走了我们所有的伤疤。"
    trigger="mouseenter"
    theme="light"
    disabled
  >
    <v3-button>鼠标移上来</v3-button>
  </v3-popover>
</template>
```

### 嵌套操作

```vue demo
<template>
  <v3-popover
    v-model="state.popoverValue"
    title="提示"
    trigger="manual"
    theme="light"
    style="display: inline-block"
  >
    <v3-button type="primary" @click="state.popoverValue = true"
      >保存</v3-button
    >
    <template #content>
      <div class="content">
        <p>
          确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？确定要保存吗？
        </p>
        <div class="action">
          <v3-button type="text" @click="state.popoverValue = false"
            >取消</v3-button
          >
          <v3-button
            type="primary"
            :loading="state.btnLoading"
            @click="handleConfirm"
            >确定</v3-button
          >
        </div>
      </div>
    </template>
  </v3-popover>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      popoverValue: false,
      btnLoading: false,
    });

    function handleConfirm() {
			state.btnLoading = true;
			setTimeout(() => {
				state.btnLoading = false;
				state.popoverValue = false;
			}, 2000);
		}

		return {
			state,
      handleConfirm,
		};
	},
});
</script>
```

### API

#### Popover参数

> 同 `BasePopper`

| 参数名 | 说明 | 类型 | 可选值 | 默认值 | 必填 |
| ------ | ---- | ---- | ------ | ------ | ---- |
| ...    | ...  | ...  | ...    | ...    | ...  |

#### Popover事件

> 同 `BasePopper`

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| ...    | ...  | ...      |

#### Popover插槽

> 同 `BasePopper`

| 插槽名 | 说明 | 子标签 |
| ------ | ---- | ------ |
| ...    | ...  | ...    |