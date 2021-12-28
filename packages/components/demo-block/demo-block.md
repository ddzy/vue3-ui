## 案例展示框（DemoBlock）

### 基本使用

内容详情区域可伸缩，大大节省占据的空间

```vue demo
<template>
  <v3-demo-block>
		<template #default>
			<h4 style="text-align: center; margin: 0;">标题</h4>
		</template>
		<template #description>
			这是一段描述信息，这是一段描述信息，这是一段描述信息
		</template>
		<template #code>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
			veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
			accusantium deserunt autem ex doloribus maxime voluptatem, cupiditate
			animi explicabo? Sed! Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Placeat veritatis molestiae quaerat eaque aliquam
			neque voluptatem accusantium corporis voluptas quidem at totam
			voluptate qui illo pariatur facilis, rerum doloremque ea.
			Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
			aut iusto corrupti quaerat repudiandae, voluptas corporis, voluptate,
			aliquid dolorum commodi exercitationem ex enim nisi assumenda minus ab
			aperiam. Dolore, voluptatibus. Ut consectetur incidunt minus facere
			eligendi fugiat id, distinctio magni autem dolor eveniet dolores nisi
			saepe quidem numquam facilis dolore quam. Iste officia laborum,
			adipisci sed perferendis labore cumque aperiam?
		</template>
	</v3-demo-block>
</template>
```

### 自定义描述区域的提示

内容详情区域可伸缩，大大节省占据的空间

```vue demo
<template>
  <v3-demo-block :descriptionTip="'简介'">
  	<template #default>
			<h4 style="text-align: center; margin: 0;">标题</h4>
		</template>
		<template #description>
			这是一段描述信息，这是一段描述信息，这是一段描述信息
		</template>
		<template #code>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
			veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
			accusantium deserunt autem ex doloribus maxime voluptatem, cupiditate
			animi explicabo? Sed! Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Placeat veritatis molestiae quaerat eaque aliquam
			neque voluptatem accusantium corporis voluptas quidem at totam
			voluptate qui illo pariatur facilis, rerum doloremque ea.
			Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
			aut iusto corrupti quaerat repudiandae, voluptas corporis, voluptate,
			aliquid dolorum commodi exercitationem ex enim nisi assumenda minus ab
			aperiam. Dolore, voluptatibus. Ut consectetur incidunt minus facere
			eligendi fugiat id, distinctio magni autem dolor eveniet dolores nisi
			saepe quidem numquam facilis dolore quam. Iste officia laborum,
			adipisci sed perferendis labore cumque aperiam?
		</template>
	</v3-demo-block>
</template>
```

### 自定义伸缩按钮的文本

```vue demo
<template>
  <v3-demo-block defaultBtnText="展开" expandedBtnText="收起">
  	<template #default>
			<h4 style="text-align: center; margin: 0;">标题</h4>
		</template>
		<template #description>
			这是一段描述信息，这是一段描述信息，这是一段描述信息
		</template>
		<template #code>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
			veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
			accusantium deserunt autem ex doloribus maxime voluptatem, cupiditate
			animi explicabo? Sed! Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Placeat veritatis molestiae quaerat eaque aliquam
			neque voluptatem accusantium corporis voluptas quidem at totam
			voluptate qui illo pariatur facilis, rerum doloremque ea.
			Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
			aut iusto corrupti quaerat repudiandae, voluptas corporis, voluptate,
			aliquid dolorum commodi exercitationem ex enim nisi assumenda minus ab
			aperiam. Dolore, voluptatibus. Ut consectetur incidunt minus facere
			eligendi fugiat id, distinctio magni autem dolor eveniet dolores nisi
			saepe quidem numquam facilis dolore quam. Iste officia laborum,
			adipisci sed perferendis labore cumque aperiam?
		</template>
	</v3-demo-block>
</template>
```

### 自定义功能按钮

```vue demo
<template>
  <v3-demo-block :descriptionTip="'简介'" :extraList="state.extraList" @extraClick="handleExtraItemClick">
  	<template #default>
			<h4 style="text-align: center; margin: 0;">标题</h4>
		</template>
		<template #description>
			这是一段描述信息，这是一段描述信息，这是一段描述信息
		</template>
		<template #code>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
			veritatis quidem cum unde dolorum quia enim illum, aspernatur odio
			accusantium deserunt autem ex doloribus maxime voluptatem, cupiditate
			animi explicabo? Sed! Lorem ipsum dolor sit amet consectetur
			adipisicing elit. Placeat veritatis molestiae quaerat eaque aliquam
			neque voluptatem accusantium corporis voluptas quidem at totam
			voluptate qui illo pariatur facilis, rerum doloremque ea.
			Necessitatibus iure pariatur eligendi dolorem vitae adipisci quo hic
			aut iusto corrupti quaerat repudiandae, voluptas corporis, voluptate,
			aliquid dolorum commodi exercitationem ex enim nisi assumenda minus ab
			aperiam. Dolore, voluptatibus. Ut consectetur incidunt minus facere
			eligendi fugiat id, distinctio magni autem dolor eveniet dolores nisi
			saepe quidem numquam facilis dolore quam. Iste officia laborum,
			adipisci sed perferendis labore cumque aperiam?
		</template>
	</v3-demo-block>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
			extraList: [
				{
					title: '转发',
					icon: 'v3-icon-resonserate',
				},
        {
					title: '喜欢',
					icon: 'v3-icon-like',
				},
			],
		});

    function handleExtraItemClick(v: {
      title: string,
      icon: string
    }) {
			alert(v.title);
		}

		return {
			state,
      handleExtraItemClick
		};
	},
});
</script>
```

### API

#### DemoBlock 参数

| 参数名          | 说明                     | 类型                                   | 可选值 | 默认值   |
| --------------- | ------------------------ | -------------------------------------- | ------ | -------- |
| descriptionTip  | 描述区域的提示           | string                                 |        |          |
| extraList       | 功能按钮列表             | Array<{ title: string, icon: string }> |        | []       | false |
| expandedBtnText | 详情区域展开时的按钮文本 | string                                 |        | 点击收缩 |
| defaultBtnText  | 详情区域收缩时的按钮文本 | string                                 |        | 点击展开 |

#### DemoBlock 事件

| 事件名     | 说明                      | 回调参数                             |
| ---------- | ------------------------- | ------------------------------------ |
| extraClick | 点击 `extraList` 项时触发 | (v: { title: string, icon: string }) |

#### DemoBlock 插槽

| 插槽名      | 说明                 | 子标签 |
| ----------- | -------------------- | ------ |
| default     | 默认插槽（标题内容） |        |
| description | 描述区域的内容       |        |
| code        | 可折叠区域的内容     |        |