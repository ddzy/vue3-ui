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

|       组件       |       简介       |        功能        |      单元测试      |        文档        |
| :--------------: | :--------------: | :----------------: | :----------------: | :----------------: |
|       Icon       |       图标       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Button      |       按钮       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|   ButtonGroup    |      按钮组      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Input       |      输入框      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|   InputNumber    |    数字输入框    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|  InputTextarea   |  多行文本输入框  | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Radio       |      单选框      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|   RadioButton    | 按钮形式的单选框 | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|    RadioGroup    |     单选框组     | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|     Checkbox     |      复选框      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|  CheckboxButton  | 按钮形式的复选框 | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|  CheckboxGroup   |     复选框组     | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|    DemoBlock     |    案例展示框    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|       Row        |   栅格系统-行    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|       Col        |   栅格系统-列    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|     Message      |      消息框      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|       Tag        |       标签       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Select      |     下拉选项     | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|     Backdrop     |      遮罩层      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Dialog      |       弹窗       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Switch      |       开关       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|     Tooltip      |     工具提示     | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|     Popover      |     弹出窗口     | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|     Divider      |      分割线      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Space       |     间隔组件     | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Badge       |       徽标       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|     Loading      |      加载中      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|       Card       |       卡片       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|    BasePopper    |   基础的悬浮窗   | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|    PopConfirm    |    气泡确认框    | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Slider      |       滑块       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|  ProgressLinear  |      进度条      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| ProgressCircular |      进度环      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|     Carousel     |      轮播图      | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Drawer      |       抽屉       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|       Back       |       返回       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
|      Image       |       图片       | :white_check_mark: | :white_check_mark: | :white_check_mark: |
