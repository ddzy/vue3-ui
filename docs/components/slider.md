# 滑块 Slider

## 基本用法

:::demo

```vue
<template>
	<v3-slider v-model="state.sliderValue"></v3-slider>
	<v3-slider v-model="state.sliderValue2" disabled></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: 20,
			sliderValue2: 20,
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 可显示间断点

:::demo

```vue
<template>
	<v3-slider
		v-model="state.sliderValue"
		label="音量"
		:marks="state.marks"
		:showStop="true"
		:step="25"
	></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: 0,
			marks: {
				0: {
					label: '0%',
					style: {},
				},
				25: {
					label: '25%',
					style: {},
				},
				50: {
					label: '50%',
					style: {
						color: 'red',
					},
				},
				75: {
					label: '75%',
					style: {},
				},
				100: {
					label: '100%',
					style: {},
				},
				125: {
					label: '125%',
					style: {},
				},
			},
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 自定义前置和后置图标

:::demo

```vue
<template>
	<v3-slider
		v-model="state.sliderValue"
		prependIcon="VolumeDown"
		appendIcon="VolumeUp"
		label="音量"
	></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: 20,
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 实时显示值

:::demo

```vue
<template>
	<v3-slider
		v-model="state.sliderValue"
		prependIcon="VolumeDown"
		appendIcon="VolumeUp"
		label="音量"
		showTooltipAlways
	></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: 20,
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 自定义步长

:::demo

```vue
<template>
	<v3-slider
		v-model="state.sliderValue"
		prependIcon="VolumeDown"
		appendIcon="VolumeUp"
		label="音量"
		showTooltipAlways
		showStop
		:max="204"
		:step="5"
	></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: 20,
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 自定义 tooltip 中显示的值

:::demo

```vue
<template>
	<v3-slider
		v-model="state.sliderValue"
		prependIcon="Dislike"
		appendIcon="Like"
		label="评分"
		showTooltipAlways
		showStop
		:max="100"
		:step="20"
		:formatTooltip="formatTooltip"
	></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: 20,
		});

		function formatTooltip(modelValue: number) {
			if (modelValue <= 0) {
				return '💀';
			} else if (modelValue <= 20) {
				return '😵';
			} else if (modelValue <= 40) {
				return '😭';
			} else if (modelValue <= 60) {
				return '🙂';
			} else if (modelValue <= 80) {
				return '😀';
			} else if (modelValue <= 100) {
				return '😆';
			}
		}

		return {
			state,
			formatTooltip,
		};
	},
});
</script>
```

:::

## 垂直方向

:::demo

```vue
<template>
	<v3-slider
		v-model="state.sliderValue"
		prependIcon="VolumeDown"
		appendIcon="VolumeUp"
		height="200px"
		vertical
		:step="25"
		:marks="state.marks"
	></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: 20,
			marks: {
				0: {
					label: '0%',
					style: {},
				},
				25: {
					label: '25%',
					style: {},
				},
				50: {
					label: '50%',
					style: {
						color: 'red',
					},
				},
				75: {
					label: '75%',
					style: {},
				},
				100: {
					label: '100%',
					style: {},
				},
				125: {
					label: '125%',
					style: {},
				},
			},
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 范围选择

:::demo

```vue
<template>
	<v3-slider
		v-model="state.sliderValue"
		prependIcon="VolumeDown"
		appendIcon="VolumeUp"
		range
	></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: [10, 45],
		});

		return {
			state,
		};
	},
});
</script>
```

:::

## 范围选择（垂直方向）

:::demo

```vue
<template>
	<v3-slider
		v-model="state.sliderValue"
		height="200px"
		range
		showTooltipAlways
		vertical
	></v3-slider>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			sliderValue: [10, 45],
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

### Slider Props

| 参数名                  | 说明                    | 类型         | 可选值 | 默认值                 | 是否必填 |
| ----------------------- | ----------------------- | ------------ | ------ | ---------------------- | -------- |
| modelValue（`v-model`） | 滑块的值                | number/array |        |                        | true     |
| max                     | 滑块最大值              | number       |        | 100                    |          |
| min                     | 滑块最小值              | number       |        | 0                      |          |
| disabled                | 是否禁用滑块            | boolean      |        | false                  |          |
| step                    | 步长                    | number       |        | 1                      |          |
| showStop                | 是否显示间断点          | boolean      |        | false                  |          |
| showTooltip             | 是否显示气泡框          | boolean      |        | true                   |          |
| showTooltipAlways       | 是否一直显示气泡框      | boolean      |        | false                  |          |
| formatTooltip           | 格式化 tooltip 显示的值 | function     |        | null                   |          |
| range                   | 是否为范围滑块          | boolean      |        | false                  |          |
| vertical                | 是否为垂直方向          | boolean      |        | false                  |          |
| height                  | 滑块为垂直方向时的高度  | string       |        | 'auto'                 |          |
| label                   | 滑块的 label            | string       |        |                        |          |
| prependIcon             | 前置图标                | string       |        |                        |          |
| appendIcon              | 后置图标                | string       |        |                        |          |
| marks                   | 断点 label 列表         | object       |        | null                   |          |
| thumbColor              | 滑块的颜色              | string       |        | rgba(0, 160, 255, 1)   |          |
| thumbShadowColor        | 滑块阴影的颜色          | string       |        | rgba(0, 170, 250, 0.3) |          |
| trackColor              | 滑动条的颜色            | string       |        | #e5e6eb                |          |
| doneTrackColor          | 已完成的进度条的颜色    | string       |        | rgba(0, 160, 255, 1)   |          |

### Slider Slots

| 插槽名  | 说明                                        | 子标签 |
| ------- | ------------------------------------------- | ------ |
| prepend | 滑块前置内容（优先级 > appendIcon > label） |        |
| append  | 滑块后置内容（优先级 > appendIcon > label） |        |
