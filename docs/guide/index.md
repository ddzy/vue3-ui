# 快速开始

## 安装

:::code-group

```bash [npm]
npm install @felibrary/vue3-ui
```

```bash [yarn]
yarn add @felibrary/vue3-ui
```

```bash [pnpm]
pnpm add @felibrary/vue3-ui
```

:::

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
