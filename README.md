# vue3-ui

vue3 组件库，文档：https://yyge.top/vue3-ui/

## 安装

### npm

```bash
npm install @felibrary/vue3-ui
```

### yarn

```bash
yarn add @felibrary/vue3-ui
```

### pnpm

```bash
pnpm add @felibrary/vue3-ui
```

## 用法

### 全局注册

```ts
import { createApp } from 'vue';

import Vue3UI from '@felibrary/vue3-ui';

import App from './App.vue';

const app = createApp(App);
app.use(Vue3UI);
```

### 按需引入

```ts
// ...
import { V3Button, V3Card } from '@felibrary/vue3-ui';

app.use(V3Button);
app.use(V3Card);
```

### 在组件中使用

```vue
<template>
	<v3-button>按钮</v3-button>
</template>
```

## 进度

|       组件       |       简介       | 功能 | 单元测试 | 文档 |
| :--------------: | :--------------: | :--: | :------: | :--: |
|       Icon       |       图标       |  ✅  |    ✅    |  ✅  |
|      Button      |       按钮       |  ✅  |    ✅    |  ✅  |
|   ButtonGroup    |      按钮组      |  ✅  |    ✅    |  ✅  |
|      Input       |      输入框      |  ✅  |    ✅    |  ✅  |
|   InputNumber    |    数字输入框    |  ✅  |    ✅    |  ✅  |
|  InputTextarea   |  多行文本输入框  |  ✅  |    ✅    |  ✅  |
|      Radio       |      单选框      |  ✅  |    ✅    |  ✅  |
|   RadioButton    | 按钮形式的单选框 |  ✅  |    ✅    |  ✅  |
|    RadioGroup    |     单选框组     |  ✅  |    ✅    |  ✅  |
|     Checkbox     |      复选框      |  ✅  |    ✅    |  ✅  |
|  CheckboxButton  | 按钮形式的复选框 |  ✅  |    ✅    |  ✅  |
|  CheckboxGroup   |     复选框组     |  ✅  |    ✅    |  ✅  |
|    DemoBlock     |    案例展示框    |  ✅  |    ✅    |  ✅  |
|       Row        |   栅格系统-行    |  ✅  |    ✅    |  ✅  |
|       Col        |   栅格系统-列    |  ✅  |    ✅    |  ✅  |
|     Message      |      消息框      |  ✅  |    ✅    |  ✅  |
|       Tag        |       标签       |  ✅  |    ✅    |  ✅  |
|      Select      |     下拉选项     |  ✅  |    ✅    |  ✅  |
|     Backdrop     |      遮罩层      |  ✅  |    ✅    |  ✅  |
|      Dialog      |       弹窗       |  ✅  |    ✅    |  ✅  |
|      Switch      |       开关       |  ✅  |    ✅    |  ✅  |
|     Tooltip      |     工具提示     |  ✅  |    ✅    |  ✅  |
|     Popover      |     弹出窗口     |  ✅  |    ✅    |  ✅  |
|     Divider      |      分割线      |  ✅  |    ✅    |  ✅  |
|      Space       |     间隔组件     |  ✅  |    ✅    |  ✅  |
|      Badge       |       徽标       |  ✅  |    ✅    |  ✅  |
|     Loading      |      加载中      |  ✅  |    ✅    |  ✅  |
|       Card       |       卡片       |  ✅  |    ✅    |  ✅  |
|    BasePopper    |   基础的悬浮窗   |  ✅  |    ✅    |  ✅  |
|    PopConfirm    |    气泡确认框    |  ✅  |    ✅    |  ✅  |
|      Slider      |       滑块       |  ✅  |    ✅    |  ✅  |
|  ProgressLinear  |      进度条      |  ✅  |    ✅    |  ✅  |
| ProgressCircular |      进度环      |  ✅  |    ✅    |  ✅  |
|     Carousel     |      轮播图      |  ✅  |    ✅    |  ✅  |
|      Drawer      |       抽屉       |  ✅  |    ✅    |  ✅  |
|       Back       |       返回       |  ✅  |    ✅    |  ✅  |
|      Image       |       图片       |  ✅  |    ✅    |  ✅  |
|       Tab        |      标签页      |  ✅  |    ✅    |  ✅  |
|      Table       |       表格       |  ✅  |    ✅    |  ✅  |
|      Upload      |       上传       |  ✅  |    ✅    |  ✅  |
|       Tree       |     树形控件     |  ✅  |    ✅    |  ✅  |
|    Watermark     |       水印       |  ✅  |    ✅    |  ✅  |
