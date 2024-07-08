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

## 箭头位置

:::demo

```vue
<template>
	<v3-radio-group v-model="arrowPlacement">
		<v3-radio label="start">start</v3-radio>
		<v3-radio label="end">end</v3-radio>
	</v3-radio-group>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-collapse :arrowPlacement="arrowPlacement">
		<v3-collapse-item v-for="(v, i) in 4" :key="v" :name="v" :title="`${v}`">
			{{ v }}
			<template #extra>
				<v3-icon type="Setting"></v3-icon>
			</template>
		</v3-collapse-item>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const arrowPlacement = ref('start');
</script>
```

:::

## 简约模式

:::demo

```vue
<template>
	<v3-checkbox v-model="plain">plain</v3-checkbox>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-collapse :plain="plain">
		<v3-collapse-item v-for="(v, i) in 4" :key="v" :name="v" :title="`${v}`">
			{{ v }}
			<template #extra>
				<v3-icon type="Setting"></v3-icon>
			</template>
		</v3-collapse-item>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const plain = ref(true);
</script>
```

:::

## 嵌套使用

:::demo

```vue
<template>
	<v3-checkbox v-model="plain">plain</v3-checkbox>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-collapse v-model="activeParent" :plain="plain">
		<v3-collapse-item
			v-for="(v, i) in collapses"
			:key="v.name"
			:name="v.name"
			:title="v.name"
		>
			<span v-if="!v?.children?.length">{{ v.content }}</span>
			<v3-collapse v-else v-model="activeChild" :plain="plain">
				<v3-collapse-item
					v-for="vv in v.children"
					:key="vv.name"
					:name="vv.name"
					:title="vv.name"
					>{{ vv.content }}</v3-collapse-item
				>
			</v3-collapse>
		</v3-collapse-item>
	</v3-collapse>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const collapses = ref([
	{
		name: '北京',
		content: '北京',
		children: [
			{
				name: '慕田峪长城',
				content: '慕田峪长城',
				children: [],
			},
			{
				name: '故宫',
				content: '故宫',
				children: [
					{
						name: '太和门',
						content: '太和门',
					},
					{
						name: '太和殿前广场',
						content: '太和殿前广场',
					},
					{
						name: '太和殿',
						content: '太和殿',
					},
					{
						name: '中和殿',
						content: '中和殿',
					},
				],
			},
			{
				name: '天坛公园',
				content: '天坛公园',
				children: [],
			},
			{
				name: '颐和园',
				content: '颐和园',
				children: [],
			},
		],
	},
	{
		name: '上海',
		content: `上海市，簡稱滬，別稱申，是中華人民共和國直轄市，中國的經濟、金融、貿易、航運、商業、上游製造和對外開放中心，上海也是一座港口城市，是中國人口第二多的城市，是中國最發達的城市之一，也是一座全球城市。`,
		children: [],
	},
	{
		name: '广州',
		content: '广州',
		children: [],
	},
	{
		name: '深圳',
		content: '深圳',
		children: [],
	},
]);
const activeParent = ref([]);
const activeChild = ref([]);
const plain = ref(false);
</script>
```

:::
