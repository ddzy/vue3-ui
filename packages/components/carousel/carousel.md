## 轮播图（Carousel）

### 基本用法

```vue demo
<template>
  <div style="width: 500px; height: 300px">
    <v3-carousel v-model="state.carouselIndex" class="common-carousel">
      <v3-carousel-item v-for="(v, i) in state.carouselList" :key="v.id">
        <div
          class="common-carousel-item__content"
          :style="{
            backgroundColor: v.bgColor,
            color: '#fff',
            height: '100%',
          }"
        >
          <p>Slide {{ i }}</p>
        </div>
      </v3-carousel-item>
    </v3-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      carouselIndex: 0,
      carouselList: [
				{
					id: 1,
					title: '图片一',
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

    return {
			state,
		};
	},
});
</script>
```

### 渐变轮播图

```vue demo
<template>
  <div style="width: 500px; height: 300px">
    <v3-carousel
      v-model="state.carouselIndex"
      effect="fade"
      class="common-carousel"
      :width="500"
      :height="300"
    >
      <v3-carousel-item
        v-for="v in state.carouselList"
        :key="v.id"
        :style="{
          backgroundImage: `url(${v.coverImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }"
      >
      </v3-carousel-item>
    </v3-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      carouselIndex: 0,
      carouselList: [
				{
					id: 1,
					title: '图片一',
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

    return {
			state,
		};
	},
});
</script>
```

### 自动轮播

```vue demo
<template>
  <div style="width: 500px; height: 300px">
    <v3-carousel
      v-model="state.carouselIndex"
      class="common-carousel"
      :width="500"
      :height="300"
      :autoplay="true"
    >
      <v3-carousel-item
        v-for="v in state.carouselList"
        :key="v.id"
        :style="{
          backgroundColor: v.bgColor,
          color: '#fff',
        }"
      >
      </v3-carousel-item>
    </v3-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      carouselIndex: 0,
      carouselList: [
				{
					id: 1,
					title: '图片一',
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

    return {
			state,
		};
	},
});
</script>
```

### 不同样式的导航按钮

```vue demo
<template>
  <v3-row>
    <v3-col :span="6">
      <div style="width: 300px; height: 300px">
        <v3-carousel
          v-model="state.carouselIndex"
          class="common-carousel"
          indicatorType="dot"
        >
          <v3-carousel-item v-for="(v, i) in state.carouselList" :key="v.id">
            <div
              class="common-carousel-item__content"
              :style="{
                backgroundColor: v.bgColor,
                color: '#fff',
                height: '100%',
              }"
            >
              <p>Slide {{ i }}</p>
            </div>
          </v3-carousel-item>
        </v3-carousel>
      </div>
    </v3-col>
    <v3-col :span="6">
      <div style="width: 300px; height: 300px">
        <v3-carousel
          v-model="state.carouselIndex"
          class="common-carousel"
          indicatorType="line"
        >
          <v3-carousel-item v-for="(v, i) in state.carouselList" :key="v.id">
            <div
              class="common-carousel-item__content"
              :style="{
                backgroundColor: v.bgColor,
                color: '#fff',
                height: '100%',
              }"
            >
              <p>Slide {{ i }}</p>
            </div>
          </v3-carousel-item>
        </v3-carousel>
      </div>
    </v3-col>
  </v3-row>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      carouselIndex: 0,
      carouselList: [
				{
					id: 1,
					title: '图片一',
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

    return {
			state,
		};
	},
});
</script>
```

### 禁用状态

```vue demo
<template>
  <div style="width: 500px; height: 300px">
    <v3-carousel
      v-model="state.carouselIndex"
      class="common-carousel"
      :width="500"
      :height="300"
      :disabled="true"
    >
      <v3-carousel-item
        v-for="v in state.carouselList"
        :key="v.id"
        :style="{
          backgroundColor: v.bgColor,
          color: '#fff',
        }"
      >
      </v3-carousel-item>
    </v3-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      carouselIndex: 0,
      carouselList: [
				{
					id: 1,
					title: '图片一',
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

    return {
			state,
		};
	},
});
</script>
```

### 不同方向上的导航按钮

```vue demo
<template>
  <v3-row>
    <v3-col :span="6">
      <div style="width: 300px; height: 300px">
        <v3-carousel
          v-model="state.carouselIndex"
          class="common-carousel"
          indicatorPosition="left"
        >
          <v3-carousel-item v-for="(v, i) in state.carouselList" :key="v.id">
            <div
              class="common-carousel-item__content"
              :style="{
                backgroundColor: v.bgColor,
                color: '#fff',
                height: '100%',
              }"
            >
              <p>Slide {{ i }}</p>
            </div>
          </v3-carousel-item>
        </v3-carousel>
      </div>
    </v3-col>
    <v3-col :span="6">
      <div style="width: 300px; height: 300px">
        <v3-carousel
          v-model="state.carouselIndex"
          class="common-carousel"
          indicatorPosition="top"
        >
          <v3-carousel-item v-for="(v, i) in state.carouselList" :key="v.id">
            <div
              class="common-carousel-item__content"
              :style="{
                backgroundColor: v.bgColor,
                color: '#fff',
                height: '100%',
              }"
            >
              <p>Slide {{ i }}</p>
            </div>
          </v3-carousel-item>
        </v3-carousel>
      </div>
    </v3-col>
    <v3-col :span="6">
      <div style="width: 300px; height: 300px">
        <v3-carousel
          v-model="state.carouselIndex"
          class="common-carousel"
          indicatorPosition="right"
        >
          <v3-carousel-item v-for="(v, i) in state.carouselList" :key="v.id">
            <div
              class="common-carousel-item__content"
              :style="{
                backgroundColor: v.bgColor,
                color: '#fff',
                height: '100%',
              }"
            >
              <p>Slide {{ i }}</p>
            </div>
          </v3-carousel-item>
        </v3-carousel>
      </div>
    </v3-col>
    <v3-col :span="6">
      <div style="width: 300px; height: 300px">
        <v3-carousel
          v-model="state.carouselIndex"
          class="common-carousel"
          indicatorPosition="bottom"
        >
          <v3-carousel-item v-for="(v, i) in state.carouselList" :key="v.id">
            <div
              class="common-carousel-item__content"
              :style="{
                backgroundColor: v.bgColor,
                color: '#fff',
                height: '100%',
              }"
            >
              <p>Slide {{ i }}</p>
            </div>
          </v3-carousel-item>
        </v3-carousel>
      </div>
    </v3-col>
  </v3-row>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      carouselIndex: 0,
      carouselList: [
				{
					id: 1,
					title: '图片一',
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

    return {
			state,
		};
	},
});
</script>
```

### 垂直方向

```vue demo
<template>
  <div style="width: 500px; height: 300px">
    <v3-carousel
      v-model="state.carouselIndex"
      class="common-carousel"
      direction="vertical"
			indicatorPosition="left"
      :autoplay="true"
      :width="500"
      :height="300"
    >
      <v3-carousel-item
        v-for="v in state.carouselList"
        :key="v.id"
        :style="{
          backgroundColor: v.bgColor,
          color: '#fff',
        }"
      >
      </v3-carousel-item>
    </v3-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
      carouselIndex: 0,
      carouselList: [
				{
					id: 1,
					title: '图片一',
					coverImg: 'https://oos.yyge.top/test/images/5.jpg',
					bgColor: 'rgba(0, 160, 255, 1)',
				},
				{
					id: 2,
					title: '图片二',
					coverImg: 'https://oos.yyge.top/test/images/6.jpg',
					bgColor: 'rgba(99, 185, 49, 1)',
				},
				{
					id: 3,
					title: '图片三',
					coverImg: 'https://oos.yyge.top/test/images/7.jpg',
					bgColor: 'rgba(201, 27, 38, 1)',
				},
				{
					id: 4,
					title: '图片四',
					coverImg: 'https://oos.yyge.top/test/images/8.jpg',
					bgColor: 'rgba(237, 170, 83, 1)',
				},
			],
		});

    return {
			state,
		};
	},
});
</script>
```

### API

#### Carousel参数

| 参数名            | 说明                                       | 类型           | 可选值                                      | 默认值                            | 是否必填 |
| ----------------- | ------------------------------------------ | -------------- | ------------------------------------------- | --------------------------------- | -------- |
| modelValue        | `v-model`绑定的值                          | number         |                                             | -1                                |          |
| defaultIndex      | 默认要展示的轮播图下标                     | number         |                                             | 0                                 |          |
| width             | 轮播图容器宽度                             | number         |                                             | 0                                 |          |
| height            | 轮播图容器高度                             | number         |                                             | 0                                 |          |
| effect            | 轮播图形式                                 | string         | slide/fade                                  | slide                             |          |
| autoplay          | 是否自动播放                               | boolean/object | { interval: number; pauseOnHover: boolean } | false                             |          |
| duration          | 同`transition-duration`                    | number         |                                             | 300                               |          |
| timingFunction    | 同`transition-timing-function`             | string         |                                             | cubic-bezier(0.17, 0.84, 0.44, 1) |          |
| disabled          | 是否禁用轮播图（不响应一切事件和切换动作） | boolean        |                                             | false                             |          |
| direction         | 轮播的方向                                 | string         | horizontal/vertical                         | horizontal                        |          |
| showArrow         | 是否显示切换箭头                           | string         | always/hover/never                          | always                            |          |
| showIndicator     | 是否显示导航按钮                           | boolean        |                                             | true                              |          |
| indicatorType     | 导航按钮的类型                             | string         | dot/line                                    | dot                               |          |
| indicatorPosition | 导航按钮的位置                             | string         | left/top/right/bottom                       | bottom                            |          |

#### Carousel事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |

#### Carousel插槽

| 插槽名     | 说明           | 子标签           |
| ---------- | -------------- | ---------------- |
| default    | 默认插槽       | v3-carousel-item |
| arrowLeft  | 自定义左箭头   |                  |
| arrowRight | 自定义右箭头   |                  |
| indicator  | 自定义导航按钮 |                  |

#### CarouselItem插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |
