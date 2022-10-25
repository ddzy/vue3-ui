## BasePopper（基础浮窗）

### 基本用法

```vue demo
<template>
	<div style="display: inline-block">
		<v3-base-popper>
			<v3-button type="primary">触发</v3-button>
			<template #content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
				eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
				excepturi repudiandae culpa veritatis praesentium porro libero
				inventore? Quasi debitis provident consequatur?
			</template>
		</v3-base-popper>
	</div>
</template>
```

### 不同的触发方式

```vue demo
<template>
	<div style="display: inline-block">
		<v3-base-popper trigger="mouseenter">
			<v3-button type="primary">mouseenter 触发</v3-button>
			<template #content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
				eveniet nesciunt amet, rem consectetur quod perferendis harum
				fugit excepturi repudiandae culpa veritatis praesentium porro
				libero inventore? Quasi debitis provident consequatur?
			</template>
		</v3-base-popper>
		<v3-divider direction="horizontal"></v3-divider>
		<v3-base-popper trigger="click">
			<v3-button type="primary">click 触发</v3-button>
			<template #content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
				eveniet nesciunt amet, rem consectetur quod perferendis harum
				fugit excepturi repudiandae culpa veritatis praesentium porro
				libero inventore? Quasi debitis provident consequatur?
			</template>
		</v3-base-popper>
	</div>
</template>
```

### 纯手动控制

```vue demo
<template>
	<div style="display: inline-block">
		<v3-base-popper
			trigger="manual"
			theme="light"
			v-model="state.popperValue"
		>
			<v3-button type="primary" @click="state.popperValue = true"
				>触发</v3-button
			>
			<template #content>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
				eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
				excepturi repudiandae culpa veritatis praesentium porro libero
				inventore? Quasi debitis provident consequatur?
			</template>
		</v3-base-popper>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			popperValue: false,
    });

		return {
			state,
		};
	},
});
</script>
```

### 两种内置主题

```vue demo
<template>
	<div style="display: inline-block">
		<v3-space :size="12">
			<v3-base-popper placement="bottom" theme="dark">
				<v3-button type="primary">黑色主题</v3-button>
				<template #content>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
					eveniet nesciunt amet, rem consectetur quod perferendis harum
					fugit excepturi repudiandae culpa veritatis praesentium porro
					libero inventore? Quasi debitis provident consequatur?
				</template>
			</v3-base-popper>

			<v3-base-popper placement="bottom" theme="light">
				<v3-button type="primary">白色主题</v3-button>
				<template #content>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
					eveniet nesciunt amet, rem consectetur quod perferendis harum
					fugit excepturi repudiandae culpa veritatis praesentium porro
					libero inventore? Quasi debitis provident consequatur?
				</template>
			</v3-base-popper>
		</v3-space>
	</div>
</template>
```

### API

#### BasePopper参数

| 参数名      | 说明                                        | 类型          | 可选值                                                                                                                             | 默认值               | 必填 |
| ----------- | ------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---- |
| modelValue  | v-model绑定值                               | boolean/null  |                                                                                                                                    | null                 |      |
| maxWidth    | 最大宽度                                    | string/number |                                                                                                                                    | 300                  |      |
| theme       | 主题色（黑/白）                             | string        | dark/light                                                                                                                         | dark                 |      |
| content     | popper 内容，也可以通过 slot="content" 传入 | string        |                                                                                                                                    |                      |      |
| title       | popper 标题                                 | string        |                                                                                                                                    |                      |      |
| placement   | 弹出位置                                    | string        | top/top-start/top-end/right/right-start/right-end/bottom/bottom-start/bottom-end/left/left-start/left-end/auto/auto-start/auto/end | top                  |      |
| disabled    | 是否禁用                                    | boolean       |                                                                                                                                    | false                |      |
| offset      | 距离触发器的距离                            | [x, y]        |                                                                                                                                    | [0, 10]              |      |
| animation   | 自定义弹出的动画                            | string        |                                                                                                                                    | v3-popper-slide-fade |      |
| delay       | 显示/隐藏的延迟                             | [show, hide]  |                                                                                                                                    | [0, 0]               |      |
| trigger     | 触发的方式                                  | string        | 'mouseenter focus'/'mouseenter click'/click/mouseenter/focusin/manual                                                              | mouseenter           |      |
| arrow       | 是否显示箭头                                | boolean       |                                                                                                                                    | true                 |      |
| zIndex      | 同 CSS 属性 z-index                         | number        |                                                                                                                                    |                      |      |
| customClass | 自定义类名                                  | string        |                                                                                                                                    |                      |      |

#### BasePopper事件

| 事件名       | 说明                   | 回调参数                     |
| ------------ | ---------------------- | ---------------------------- |
| show         | 浮窗打开时触发         | (instance: VueTippy) => void |
| hide         | 浮窗关闭时触发         | (instance: VueTippy) => void |
| clickOutside | 点击浮窗外部区域时触发 | (instance: VueTippy) => void |
| mount        | 浮窗挂载完成时触发     | (instance: VueTippy) => void |

#### BasePopper插槽

| 插槽名  | 说明                                                 | 子标签 |
| ------- | ---------------------------------------------------- | ------ |
| default | 默认插槽                                             |        |
| content | 自定义浮窗内部的内容（也可直接通过`prop=content`传入 |        |
