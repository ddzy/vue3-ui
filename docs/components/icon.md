# Icon 图标

:::warning
`vue3-ui` 底层图标采用 [IconPark](https://iconpark.oceanengine.com/home)，以下仅列举部分图标，更多图标可参考：[官方图标库](https://iconpark.oceanengine.com/official)
:::

## 图标集合

<div :class="$style.container">
  <v3-input v-model="state.keyword" placeholder="搜索图标" class="inputer"></v3-input>
  <div :class="$style['icon-wrapper']">
    <table :class="$style['icon-table']">
      <tr v-for="(v, i) in Math.ceil(state.icons.length / state.columns)" :key="i">
        <td v-for="vv in (state.icons.slice(i * state.columns, i * state.columns + state.columns))" :key="vv._id" :class="$style.td"  @click="copy(vv)">
          <div :class="$style['icon-item']">
            <v3-icon :class="$style['icon-id']" :type="vv._id" size="22"></v3-icon>
            <span :class="$style['icon-name']">{{ vv._id }}</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

<script lang="ts" setup>
  import { reactive, getCurrentInstance } from 'vue';
  import { useClipboard } from '@vueuse/core';

  const clipboard = useClipboard();
  const app = getCurrentInstance().proxy;
  const state = reactive({
    keyword: '',
    columns: 5,
    icons: [
      {
        _id: "CloseOne",
        name: "CloseOne",
      },
      {
        _id: "Caution",
        name: "Caution",
      },
      {
        _id: "Attention",
        name: "Attention",
      },
      {
        _id: "Info",
        name: "Info",
      },
      {
        _id: "Like",
        name: "Like",
      },
      {
        _id: "DislikeTwo",
        name: "DislikeTwo",
      },
      {
        _id: "Checkbox",
        name: "Checkbox",
      },
      {
        _id: "ShareTwo",
        name: "ShareTwo",
      },
      {
        _id: "Check",
        name: "Check",
      },
      {
        _id: "CheckOne",
        name: "CheckOne",
      },
      {
        _id: "Plus",
        name: "Plus",
      },
      {
        _id: "Minus",
        name: "Minus",
      },
      {
        _id: "ReduceOne",
        name: "ReduceOne",
      },
      {
        _id: "LoadingOne",
        name: "LoadingOne",
      },
      {
        _id: "ZoomIn",
        name: "ZoomIn",
      },
      {
        _id: "ZoomOut",
        name: "ZoomOut",
      },
      {
        _id: "Search",
        name: "Search",
      },
      {
        _id: "EditTwo",
        name: "EditTwo",
      },
      {
        _id: "Gift",
        name: "Gift",
      },
      {
        _id: "Navigation",
        name: "Navigation",
      },
      {
        _id: "Pic",
        name: "Pic",
      },
      {
        _id: "PreviewOpen",
        name: "PreviewOpen",
      },
      {
        _id: "PreviewClose",
        name: "PreviewClose",
      },
      {
        _id: "PreviewCloseOne",
        name: "PreviewCloseOne",
      },
      {
        _id: "Down",
        name: "Down",
      },
      {
        _id: "Up",
        name: "Up",
      },
      {
        _id: "Left",
        name: "Left",
      },
      {
        _id: "Right",
        name: "Right",
      },
      {
        _id: "ArrowUp",
        name: "ArrowUp",
      },
      {
        _id: "ArrowDown",
        name: "ArrowDown",
      },
      {
        _id: "ArrowLeft",
        name: "ArrowLeft",
      },
      {
        _id: "ArrowRight",
        name: "ArrowRight",
      },
      {
        _id: "ArrowLeftDown",
        name: "ArrowLeftDown",
      },
      {
        _id: "ArrowLeftUp",
        name: "ArrowLeftUp",
      },
      {
        _id: "ArrowRightDown",
        name: "ArrowRightDown",
      },
      {
        _id: "ArrowRightUp",
        name: "ArrowRightUp",
      },
      {
        _id: "ToTop",
        name: "ToTop",
      },
      {
        _id: "ToBottom",
        name: "ToBottom",
      },
      {
        _id: "ToLeft",
        name: "ToLeft",
      },
      {
        _id: "ToRight",
        name: "ToRight",
      },
      {
        _id: "MenuUnfold",
        name: "MenuUnfold",
      },
      {
        _id: "Login",
        name: "Login",
      },
      {
        _id: "Logout",
        name: "Logout",
      },
      {
        _id: "Send",
        name: "Send",
      },
      {
        _id: "Upload",
        name: "Upload",
      },
      {
        _id: "Code",
        name: "Code",
      },
      {
        _id: "TwoDimensionalCode",
        name: "TwoDimensionalCode",
      },
      {
        _id: "dollar",
        name: "dollar",
      },
      {
        _id: "AddOne",
        name: "AddOne",
      },
      {
        _id: "User",
        name: "User",
      },
      {
        _id: "AddUser",
        name: "AddUser",
      },
      {
        _id: "ReduceUser",
        name: "ReduceUser",
      },
      {
        _id: "ShoppingCart",
        name: "ShoppingCart",
      },
      {
        _id: "Translate",
        name: "Translate",
      },
      {
        _id: "Delete",
        name: "Delete",
      },
      {
        _id: "Power",
        name: "Power",
      },
      {
        _id: "ListCheckbox",
        name: "ListCheckbox",
      },
      {
        _id: "Message",
        name: "Message",
      },
      {
        _id: "MessageUnread",
        name: "MessageUnread",
      },
      {
        _id: "MessageOne",
        name: "MessageOne",
      },
      {
        _id: "Lock",
        name: "Lock",
      },
      {
        _id: "Unlock",
        name: "Unlock",
      },
      {
        _id: "Link",
        name: "Link",
      },
      {
        _id: "LinkTwo",
        name: "LinkTwo",
      },
      {
        _id: "Pin",
        name: "Pin",
      },
      {
        _id: "Drag",
        name: "Drag",
      },
      {
        _id: "VolumeUp",
        name: "VolumeUp",
      },
      {
        _id: "VolumeDown",
        name: "VolumeDown",
      },
      {
        _id: "VolumeMute",
        name: "VolumeMute",
      },
      {
        _id: "Refresh",
        name: "Refresh",
      },
      {
        _id: "TagOne",
        name: "TagOne",
      },
      {
        _id: "Tag",
        name: "Tag",
      },
      {
        _id: "Star",
        name: "Star",
      },
      {
        _id: "Home",
        name: "Home",
      },
      {
        _id: "Male",
        name: "Male",
      },
      {
        _id: "Female",
        name: "Female",
      },
      {
        _id: "More",
        name: "More",
      },
      {
        _id: "MoreOne",
        name: "MoreOne",
      },
      {
        _id: "MoreTwo",
        name: "MoreTwo",
      },
      {
        _id: "Rss",
        name: "Rss",
      },
      {
        _id: "Save",
        name: "Save",
      },
      {
        _id: "Tool",
        name: "Tool",
      },
      {
        _id: "Setting",
        name: "Setting",
      },
      {
        _id: "Upload",
        name: "Upload",
      },
      {
        _id: "Copy",
        name: "Copy",
      }
    ]
  })

  function copy(row) {
    if(!clipboard.isSupported) {
      return app.$message.warning({
        message: '您的浏览器不支持 Clipboard API',
      })
    }
    let code = `<V3Icon type="${row._id}" />`
    clipboard.copy(code);
    if(clipboard.copied) {
      app.$message.success({
        message: code,
      });
    }
  }
</script>
<style module lang="scss">
  .container {
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
    padding: 6px 10px !important;
  }
  .icon-id {
  }
  .icon-name {
    margin-top: 12px;
    color: #999;
  }
  .td {
    &:hover {
      background-color: #f3f4f5;
    }
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
