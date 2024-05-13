# Icon 图标

:::warning
`vue3-ui` 底层图标采用 [IconPark](https://iconpark.oceanengine.com/home)，以下仅列举部分图标，更多图标可参考：[官方图标库](https://iconpark.oceanengine.com/official)
:::

## 图标集合

<div :class="$style.container">
  <v3-input v-model="state.keyword" placeholder="搜索图标" class="inputer"></v3-input>
  <div :class="$style['icon-config']">
  </div>
  <div :class="$style['icon-wrapper']">
    <table :class="$style['icon-table']">
      <tr v-for="v in Math.ceil(state.icons.length / state.columns)" :key="v">
        <td v-for="vv in (state.icons.slice(v * state.columns, v * state.columns + state.columns))" :key="vv._id" >
          <div :class="$style['icon-item']">
            <v3-icon :class="$style['icon-id']" :type="vv._id" size="24"></v3-icon>
            <span :class="$style['icon-name']">{{ vv._id }}</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

<script lang="ts" setup>
  import { reactive } from 'vue';

  const state = reactive({
    keyword: '',
    columns: 5,
    icons: [
      {
        _id: 'Plus',
        name: "加"
      },
      {
        _id: 'Minus',
        name: "减"
      },
      {
        _id: 'Search',
        name: "搜索"
      },
      {
        _id: 'Female',
        name: "女性"
      },
      {
        _id: 'Male',
        name: "男性"
      },
      {
        _id: 'Home',
        name: "首页"
      },
      {
        _id: 'FullScreen',
        name: "全局放大"
      },
      {
        _id: 'LoadingOne',
        name: "加载"
      },
      {
        _id: 'Link',
        name: "链接"
      },
      {
        _id: 'IndexFinger',
        name: "食指"
      },
      {
        _id: 'Star',
        name: "星星"
      },
      {
        _id: 'Announcement',
        name: "公告"
      },
      {
        _id: 'Setting',
        name: "设置"
      },
      {
        _id: 'Config',
        name: "配置"
      },
      {
        _id: 'MessageOne',
        name: "消息"
      },
      {
        _id: 'PreviewOpen',
        name: "预览-打开"
      },
      {
        _id: 'PreviewClose',
        name: "预览-关闭"
      },
      {
        _id: 'Lock',
        name: "锁定"
      },
      {
        _id: 'Unlock',
        name: "解锁"
      },
      {
        _id: 'Check',
        name: "检验"
      },
      {
        _id: 'CheckOne',
        name: "检验"
      },
      {
        _id: 'Close',
        name: "关闭"
      },
      {
        _id: 'CloseOne',
        name: "关闭"
      },
      {
        _id: 'Code',
        name: "代码"
      },
      {
        _id: 'Copy',
        name: "复制"
      },

      {
        _id: 'Delete',
        name: "删除"
      },
      {
        _id: 'Edit',
        name: "编辑"
      },
      {
        _id: 'VolumeDown',
        name: "音量减小"
      },
      {
        _id: 'VolumeUp',
        name: "音量增加"
      },
      {
        _id: 'ArrowDown',
        name: "箭头下"
      },
      {
        _id: 'ArrowUp',
        name: "箭头上"
      },
      {
        _id: 'Down',
        name: "下"
      },
      {
        _id: 'Up',
        name: "上"
      },
      {
        _id: 'ArrowCircleDown',
        name: "圆形箭头下"
      },
      {
        _id: 'ArrowCircleUp',
        name: "圆形箭头上"
      },
      {
        _id: 'ThumbsDown',
        name: "踩"
      },
      {
        _id: 'ThumbsUp',
        name: "赞"
      },
      {
        _id: 'Download',
        name: "下载"
      },
      {
        _id: 'Export',
        name: "导出"
      },
      {
        _id: 'ToTop',
        name: "去顶部"
      },
      {
        _id: 'ToBottom',
        name: "去底部"
      },
      {
        _id: 'Share',
        name: "分享"
      },
      {
        _id: 'Like',
        name: "喜欢"
      },
      {
        _id: 'Unlike',
        name: "不喜欢"
      },
      {
        _id: 'Tag',
        name: "标签"
      },
      {
        _id: 'Checkbox',
        name: "多选框"
      },
      {
        _id: 'RadioTwo',
        name: "单选"
      },
      {
        _id: 'More',
        name: "更多"
      },
      {
        _id: 'Refresh',
        name: "刷新"
      },
      {
        _id: 'Save',
        name: "保存"
      },
    ],
  })
</script>
<style module lang="postcss">
  .container {
    margin-top: 20px;
  }
  .icon-config {
    margin-top: 20px;
  }
  .icon-wrapper {
  }
  .icon-table {
    display: table !important;
    tr {
      background-color: #fff !important;
    }
    td {
      cursor: pointer;
    }
  }
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 16px !important;
  }
  .icon-id {
  }
  .icon-name {
    margin-top: 12px;
  }
</style>

## 自定义图标

:::demo

```vue
<template>
	<v3-space :key="JSON.stringify(state)">
		<v3-icon
			v-for="v in state.icons"
			:type="v._id"
			:size="state.size"
			:theme="state.theme"
			:strokeLinejoin="state.strokeLinejoin"
			:strokeLineCap="state.strokeLineCap"
			:fill="state.fill"
		></v3-icon>
	</v3-space>
	<v3-slider v-model="state.size" label="大小："></v3-slider>
	<v3-row :class="$style.row">
		<v3-col :span="2">风格：</v3-col>
		<v3-col :span="10">
			<v3-radio-group v-model="state.theme">
				<v3-radio v-for="v in state.iconThemes" :key="v" :label="v">{{
					v
				}}</v3-radio>
			</v3-radio-group>
		</v3-col>
	</v3-row>
	<v3-row :class="$style.row">
		<v3-col :span="2">端点类型：</v3-col>
		<v3-col :span="10">
			<v3-radio-group v-model="state.strokeLineCap">
				<v3-radio v-for="v in state.iconStrokeLineCaps" :key="v" :label="v">{{
					v
				}}</v3-radio>
			</v3-radio-group>
		</v3-col>
	</v3-row>
	<v3-row :class="$style.row">
		<v3-col :span="2">拐点类型：</v3-col>
		<v3-col :span="10">
			<v3-radio-group v-model="state.strokeLinejoin">
				<v3-radio v-for="v in state.iconStrokeLineJoins" :key="v" :label="v">{{
					v
				}}</v3-radio>
			</v3-radio-group>
		</v3-col>
	</v3-row>
	<v3-row :class="$style.row">
		<v3-col :span="2">颜色：</v3-col>
		<v3-col :span="10">
			<v3-radio-group v-model="state.fill">
				<v3-radio v-for="v in state.iconFills" :key="v" :label="v">{{
					v
				}}</v3-radio>
			</v3-radio-group>
		</v3-col>
	</v3-row>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue';

const state = reactive({
	size: 16,
	theme: 'outline',
	strokeLinejoin: 'round',
	strokeLineCap: 'round',
	fill: '#333',
	icons: [
		{
			_id: 'ThumbsUp',
		},
		{
			_id: 'ThumbsDown',
		},
		{
			_id: 'Like',
		},
		{
			_id: 'Unlike',
		},
		{
			_id: 'Caution',
		},
	],
	iconThemes: ['outline', 'filled', 'two-tone', 'multi-color'],
	iconStrokeLineJoins: ['miter', 'round', 'bevel'],
	iconStrokeLineCaps: ['butt', 'round', 'square'],
	iconFills: ['#333', '#00a0ff', '#63b931', '#c91b26', '#edaa53', '#b8b0b0'],
});
</script>
<style module lang="postcss">
.row {
	margin-top: 20px;
}
</style>
```

:::

## API

### Icon Props

| 参数名         | 说明                                                                                                         | 类型              | 可选值                                            | 默认值         | 是否必填 |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ----------------- | ------------------------------------------------- | -------------- | -------- |
| type           | 图标类型                                                                                                     | string            | [图标集合](#图标集合)                             |                | 是       |
| theme          | 图标主题                                                                                                     | string            | 'outline' / 'filled' / 'two-tone' / 'multi-color' | 'outline'      |          |
| size           | 图标大小（width=height）                                                                                     | number            |                                                   | '1em'          |          |
| spin           | 是否转动                                                                                                     | boolean           |                                                   | false          |          |
| fill           | 图标颜色                                                                                                     | string / string[] |                                                   | 'currentColor' |          |
| strokeLinecap  | 同 svg 的 [stroke-linecap](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap) 属性   | string            | 'butt' / 'round' / 'square'                       | 'round'        |          |
| strokeLinejoin | 同 svg 的 [stroke-linejoin](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin) 属性 | string            | 'miter' / 'round' / 'bevel'                       | 'round'        |          |
| strokeWidth    | 同 svg 的 [stroke-width](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width) 属性       | number            |                                                   | 4              |          |
