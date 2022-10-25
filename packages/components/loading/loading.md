## Loading（加载中）

### 基本用法

```vue demo
<template>
  <v3-button type="primary" @click="handleClick">点我</v3-button>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
    });
    const app = getCurrentInstance().proxy;

    function handleClick() {
			const instance = app.$loading({
				fullscreen: true,
				content: `加载中。。。`,
			});

			setTimeout(() => {
				instance.close();
			}, 2000);
		}

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 可传入VNode

```vue demo
<template>
  <v3-button type="primary" @click="handleClick">点我</v3-button>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, h } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
    });
    const app = getCurrentInstance().proxy;

    function handleClick() {
			const instance = app.$loading({
				fullscreen: true,
				content: h(
					'button',
					{
						onClick: () => {
							instance.close();
							app.$message({
								type: 'success',
								message: '手动关闭 loading~',
							});
						},
					},
					'取消',
				),
      })
		}

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 在容器中使用

```vue demo
<template>
  <v3-button type="primary" @click="handleClick">点我</v3-button>
  <v3-card
    style="margin-top: 6px;"
    title="标题"
    v-loading="state.loading"
  >
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, fugiat
    consectetur blanditiis aspernatur, magnam cumque dignissimos iusto
    quisquam velit quidem deserunt! Quaerat ad incidunt ducimus,
    distinctio omnis rerum vitae obcaecati.
  </v3-card>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, h } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      loading: false,
    });
    const app = getCurrentInstance().proxy;

    function handleClick() {
			state.loading = !state.loading;
		}

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 通过自定义指令使用

```vue demo
<template>
  <v3-button type="primary" @click="handleClick">点我</v3-button>
  <v3-card
    style="margin-top: 6px;"
    v-loading="{
      loading: state.loading,
      content: '加载中...',
      backgroundColor: 'rgba(0, 0, 0, .4)',
      color: '#fff',
    }"
    :bodyStyle="{
      padding: 0,
    }"
  >
    <div class="img" style="height: 200px; background: url('https://oos.yyge.top/test%2Fimages%2F1.jpg') no-repeat center center / cover; background-image: url('https://oos.yyge.top/test%2Fimages%2F1.jpg')"></div>
    <template #footer>
      <div class="action">
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
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, h } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      loading: false,
    });
    const app = getCurrentInstance().proxy;

    function handleClick() {
			state.loading = !state.loading;
		}

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### API

#### Loading参数

| 参数名          | 说明                          | 类型          | 可选值 | 默认值 | 必填 |
| --------------- | ----------------------------- | ------------- | ------ | ------ | ---- |
| fullscreen      | 是否全屏显示                  | boolean       |        | false  |      |
| fixed           | 是否全屏显示                  | boolean       |        | false  |      |
| content         | 自定义 loading 内容           | string/object |        |        |      |
| backgroundColor | 自定义 loading 遮罩层的背景色 | string        |        |        |      |
| color           | 自定义 loading 的文字颜色     | string        |        |        |      |
| customClass     | 自定义 loading 容器类名       | string        |        |        |      |

#### Loading事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
|        |      |          |

#### Loading插槽

| 插槽名 | 说明 | 子标签 |
| ------ | ---- | ------ |
|        |      |        |