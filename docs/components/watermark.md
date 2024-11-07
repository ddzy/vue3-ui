# Watermark 水印

## 基本用法

:::demo

```vue
<template>
	<v3-watermark content="重要机密">
		<div style="height: 400px;"></div>
	</v3-watermark>
</template>
<script lang="ts" setup></script>
```

:::

## 全屏水印

:::demo

```vue
<template>
	<v3-checkbox v-model="fullscreen">全屏</v3-checkbox>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-watermark content="重要机密" :fullscreen="fullscreen" :zIndex="9999">
		<div style="height: 400px;"></div>
	</v3-watermark>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const fullscreen = ref(false);
</script>
```

:::

## 文本自动换行

:::demo

```vue
<template>
	<v3-watermark content="重要机密，非常重要，特别重要，巨重要" :width="120">
		<div style="height: 400px;"></div>
	</v3-watermark>
</template>
<script lang="ts" setup></script>
```

:::

## 文本手动换行

`content`可以传入一个数组，手动指定多行文本

:::demo

```vue
<template>
	<v3-watermark
		:content="[
			'1. 重要机密重要机密重要机密重要机密重要机密',
			'2. 非常非常重要',
			'3. 巨重要',
		]"
		:gap="100"
	>
		<div style="height: 400px;"></div>
	</v3-watermark>
</template>
<script lang="ts" setup></script>
```

:::

## 水印参数

:::demo

```vue
<template>
	<div :class="$style['field']">
		<span :class="$style['field-label']">水印文本（content）：</span>
		<v3-input v-model="content"></v3-input>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">水印宽度（width）：</span>
		<v3-input-number
			v-model="width"
			:precision="1"
			controls-position="right"
		></v3-input-number>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">文本行高（lineHeight）：</span>
		<v3-input-number
			v-model="lineHeight"
			:precision="1"
			controls-position="right"
		></v3-input-number>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">旋转角度（rotate）：</span>
		<v3-input-number
			v-model="rotate"
			:precision="1"
			controls-position="right"
		></v3-input-number>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">水印定位层级（zIndex）：</span>
		<v3-input-number
			v-model="zIndex"
			controls-position="right"
		></v3-input-number>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">水印间距（gap）：</span>
		<v3-input-number v-model="gap" controls-position="right"></v3-input-number>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">水印起始位置偏移量（offset）：</span>
		<v3-input-number
			v-model="offset"
			controls-position="right"
		></v3-input-number>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">文本大小（font.fontSize）：</span>
		<v3-input-number
			v-model="font.fontSize"
			controls-position="right"
		></v3-input-number>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">文本粗细（font.fontWeight）：</span>
		<v3-input-number
			v-model="font.fontWeight"
			controls-position="right"
			:max="900"
			:min="100"
			:step="100"
			:stepStrictly="true"
		></v3-input-number>
	</div>
	<div :class="$style['field']">
		<span :class="$style['field-label']">文本颜色（font.color）：</span>
		<v3-input v-model="font.color"></v3-input>
	</div>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-watermark
		:content="content"
		:width="width"
		:lineHeight="lineHeight"
		:rotate="rotate"
		:zIndex="zIndex"
		:gap="gap"
		:offset="offset"
		:font="font"
	>
		<div style="height: 400px;"></div>
	</v3-watermark>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const content = ref('重要机密');
const width = ref(120);
const lineHeight = ref(1.5);
const rotate = ref(-30);
const zIndex = ref(10);
const gap = ref(50);
const offset = ref(0);
const font = reactive({
	fontSize: 16,
	fontWeight: 400,
	color: 'rgba(233, 233, 233, 1)',
});
</script>
<style module lang="scss">
.field {
	display: flex;
	align-items: center;
	&:not(:first-child) {
		margin-top: 12px;
	}
}
.field-label {
	flex-shrink: 0;
}
</style>
```

:::
