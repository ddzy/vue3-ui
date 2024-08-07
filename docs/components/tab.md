# Tab 标签页

## 基本用法

可通过`v-model`动态更新当前活跃的页签

:::demo

```vue
<template>
	<v3-tab v-model="currentActiveTab">
		<v3-tab-pane v-for="v in tabs" :key="v._id" :name="v._id" :title="v.name">{{
			v.content
		}}</v3-tab-pane>
	</v3-tab>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const tabs = [
	{
		_id: 1,
		name: '韩信传',
		content: `「韩信言『汉王遇我甚厚，载我以其车，衣我以其衣，食我以其食。吾闻之，乘人之车者载人之患，衣人之衣者怀人之忧，食人之食者死人之事，吾岂可以见利而忘义乎？』」`,
	},
	{
		_id: 2,
		name: '苏东坡-晁错论',
		content: `天下之患，最不可为者，名为治平无事，而其实有不测之忧，坐观其变，而不为之所，则恐至于不可救，起而强为之则天下狃于治平之安，而不吾信 ——《苏东坡 晁错论》`,
	},
	{
		_id: 3,
		name: '大汉',
		content: `大汉开国元勋淮阴侯韩信死于长乐钟室，年仅三十五岁。随后，韩信三族被诛，数千无辜，血染长安，哭号之声，传荡千古，当是时，寒风凛冽，长空飘雪，长安满城人尽嗟叹，无不悲怆，皆言淮阴侯一饭千金，不忘漂母；解衣推食，宁负汉皇？萧何一言便强入贺，欲谋逆者怎会坦率如斯？是侯不负汉，而汉忍于负侯，侯之死，冤乎哉！ 不日，蒯通被带到，高祖亲自审问。「当日汝与韩信之言，究竟为何？」 蒯通道「吾相韩信，言其面不过封侯，背则贵不可言。因说之背汉自立，则可三分天下也。」 高祖又问：「然信有何言？」 蒯通长叹一声道`,
	},
	{
		_id: 4,
		name: '公瑾',
		content: `遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一樽还酹江月 `,
	},
	{
		_id: 5,
		name: '千古风流人物',
		content: `大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。`,
	},
];
const currentActiveTab = ref<number>(5);
</script>
```

:::

## 不同的切换方式

:::demo

```vue
<template>
	<v3-radio-group v-model="trigger">
		<v3-radio label="click">click</v3-radio>
		<v3-radio label="hover">hover</v3-radio>
	</v3-radio-group>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-tab :trigger="trigger">
		<v3-tab-pane v-for="v in 4" :key="v" :name="v" :title="`标签${v}`">{{
			v
		}}</v3-tab-pane>
	</v3-tab>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const trigger = ref<string>('click');
</script>
```

:::

## 可增减的页签

:::demo

```vue
<template>
	<v3-space :size="0">
		<span>显示关闭按钮的时机：</span>
		<v3-radio-group v-model="showClose">
			<v3-radio label="always">always</v3-radio>
			<v3-radio label="active">active</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-tab
		v-model="currentActiveTab"
		:showClose="showClose"
		type="card"
		addable
		closable
		@add="handleAdd"
		@close="handleClose"
	>
		<v3-tab-pane
			v-for="(v, i) in tabs"
			:key="v"
			:name="v"
			:title="`标签${v}`"
			:closable="i % 2 === 0"
			>{{ v }}</v3-tab-pane
		>
	</v3-tab>
</template>
<script lang="ts" setup>
import { nextTick, ref } from 'vue';

const currentActiveTab = ref<number>(5);
const tabs = ref<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);
const showClose = ref<string>('always');
function handleAdd() {
	const newTab = tabs.value.length ? Math.max(...tabs.value) + 1 : 1;
	const newTabs = tabs.value.concat(newTab);
	tabs.value = newTabs;
	currentActiveTab.value = newTab;
}
async function handleClose(name: number) {
	const closedIndex = tabs.value.findIndex((v) => v === name);
	let newActiveIndex = Math.max(closedIndex - 1, 0);
	let newTabs = tabs.value.filter((v) => v !== name);
	tabs.value = newTabs;
	currentActiveTab.value = newTabs[newActiveIndex];
}
</script>
```

:::

## 不同风格的页签

:::demo

```vue
<template>
	<v3-space>
		<span>方向：</span>
		<v3-radio-group v-model="placement">
			<v3-radio label="top">top</v3-radio>
			<v3-radio label="right">right</v3-radio>
			<v3-radio label="bottom">bottom</v3-radio>
			<v3-radio label="left">left</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-space>
		<span>风格：</span>
		<v3-radio-group v-model="type">
			<v3-radio label="bar">bar</v3-radio>
			<v3-radio label="line">line</v3-radio>
			<v3-radio label="card">card</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-space>
		<span>大小：</span>
		<v3-radio-group v-model="size">
			<v3-radio label="small">small</v3-radio>
			<v3-radio label="medium">medium</v3-radio>
			<v3-radio label="large">large</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-tab :placement="placement" :type="type" :size="size">
		<v3-tab-pane v-for="v in 4" :key="v" :name="v" :title="`标签${v}`">{{
			v
		}}</v3-tab-pane>
	</v3-tab>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const placement = ref<string>('top');
const type = ref<string>('bar');
const size = ref<string>('medium');
</script>
```

:::

## 禁用状态

:::demo

```vue
<template>
	<v3-space>
		<v3-radio-group v-model="type">
			<v3-radio label="bar">bar</v3-radio>
			<v3-radio label="line">line</v3-radio>
			<v3-radio label="card">card</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-tab v-model="currentActiveTab" :type="type">
		<v3-tab-pane
			v-for="v in tabs"
			:key="v.name"
			:name="v.name"
			:title="`标签${v.name}`"
			:disabled="v.disabled"
			>{{ v.name }}</v3-tab-pane
		>
	</v3-tab>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const currentActiveTab = ref(2);
const type = ref<string>('card');
const tabs = ref([
	{
		name: 1,
		disabled: false,
	},
	{
		name: 2,
		disabled: true,
	},
	{
		name: 3,
		disabled: false,
	},
	{
		name: 4,
		disabled: false,
	},
]);
</script>
```

:::

## 不显示切换器

可以通过将`showHeader`设置为`false`，从而不显示切换器，可以自定义自己的切换器

:::demo

```vue
<template>
	<v3-space>
		<v3-radio-group v-model="currentActiveTab">
			<v3-radio v-for="v in tabs" :label="v">{{ v }}</v3-radio>
		</v3-radio-group>
	</v3-space>
	<v3-divider direction="horizontal"></v3-divider>
	<v3-tab v-model="currentActiveTab" :showHeader="false">
		<v3-tab-pane v-for="v in tabs" :key="v" :name="v" :title="`标签${v}`">{{
			v
		}}</v3-tab-pane>
	</v3-tab>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const tabs = ref(['北京', '上海', '广州', '深圳']);
const currentActiveTab = ref('北京');
</script>
```

:::

## API

### Tab Props

| 参数名         | 说明                                          | 类型    | 可选值                      | 默认值 | 是否必填 |
| -------------- | --------------------------------------------- | ------- | --------------------------- | ------ | -------- |
| type           | 页签类型                                      | string  | bar / line / card           | bar    |          |
| addable        | 是否可动态增加页签，只当`type = 'card'`时有效 | boolean |                             | false  |          |
| closable       | 是否可关闭页签，只当`type = 'card'`时有效     | boolean |                             | false  |          |
| showClose      | 显示关闭按钮的时机，只当`type = 'card'`时有效 | string  | always / hover              | always |          |
| size           | 页签大小                                      | string  | small / medium / large      | medium |          |
| trigger        | 切换页签的方式                                | string  | click / hover               | click  |          |
| placement      | 页签切换器的位置                              | string  | top / right / bottom / left | top    |          |
| showHeader     | 是否显示页签切换器                            | boolean |                             | true   |          |
| centeredHeader | 当前活跃的页签切换器项是否始终保持居中        | boolean |                             | true   |          |

### TabPane Props

| 参数名   | 说明               | 类型            | 可选值 | 默认值 | 是否必填 |
| -------- | ------------------ | --------------- | ------ | ------ | -------- |
| name     | 页签的唯一标识     | string / number |        | 0      |          |
| title    | 页签的标题         | string          |        | ''     |          |
| disabled | 是否禁用当前页签   | boolean         |        | false  |          |
| closable | 当前页签是否可关闭 | boolean         |        | true   |          |
