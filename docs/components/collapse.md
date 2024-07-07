# Collapse 折叠面板

## 基本用法

:::warning
当`v-model`绑定的值不为数组，那么效果同手风琴
:::

:::demo

```vue
<template>
	<v3-space>
		<span>展开了：</span>
		<span>{{ currentActiveCollapse }}</span>
	</v3-space>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-collapse v-model="currentActiveCollapse">
		<v3-collapse-item v-for="v in collapses" :key="v" :name="v" :title="v">{{
			v
		}}</v3-collapse-item>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const collapses = ref(['北京', '上海', '广州', '深圳']);
const currentActiveCollapse = ref(['北京']);
</script>
```

:::

## 手风琴

:::demo

```vue
<template>
	<v3-space>
		<span>展开了：</span>
		<span>{{ currentActiveCollapse }}</span>
	</v3-space>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-collapse v-model="currentActiveCollapse" accordion>
		<v3-collapse-item v-for="v in collapses" :key="v" :name="v" :title="v">{{
			v
		}}</v3-collapse-item>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const collapses = ref(['北京', '上海', '广州', '深圳']);
const currentActiveCollapse = ref('北京');
</script>
```

:::

## 不同的切换策略

`show`代表`v-show`切换，而`if`代表`v-if`切换

:::demo

```vue
<template>
	<v3-radio-group v-model="displayStrategy">
		<v3-radio label="if">if</v3-radio>
		<v3-radio label="show">show</v3-radio>
	</v3-radio-group>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-collapse :displayStrategy="displayStrategy">
		<v3-collapse-item
			v-for="(v, i) in 4"
			:key="v"
			:name="v"
			:title="`${v}`"
			:displayStrategy="i === 0 ? 'show' : undefined"
			>{{ v }}</v3-collapse-item
		>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const displayStrategy = ref('if');
</script>
```

:::

## 不同的切换区域

默认点击整个`header`区域可切换折叠面板，也可以自行配置可切换区域

:::demo

```vue
<template>
	<v3-checkbox-group v-model="triggerArea">
		<v3-checkbox label="space">space</v3-checkbox>
		<v3-checkbox label="icon">icon</v3-checkbox>
		<v3-checkbox label="title">title</v3-checkbox>
		<v3-checkbox label="extra">extra</v3-checkbox>
	</v3-checkbox-group>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-collapse :triggerArea="triggerArea">
		<v3-collapse-item v-for="(v, i) in 4" :key="v" :name="v" :title="`${v}`">
			{{ v }}
			<template #extra>
				<v3-icon type="CloseSmall"></v3-icon>
			</template>
		</v3-collapse-item>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const triggerArea = ref(['space', 'icon', 'title', 'extra']);
</script>
```

:::
