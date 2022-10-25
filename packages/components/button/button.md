## 按钮（Button）

### 基本按钮

```vue demo
<template>
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" @click="handleClick(v)">
			{{ v.title }}
		</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Message from '@components/message/lib/MessageConstructor';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'default',
				title: '默认按钮',
			},
			{
				type: 'info',
				title: '信息按钮',
			},
			{
				type: 'primary',
				title: '主按钮',
			},
			{
				type: 'success',
				title: '成功按钮',
			},
			{
				type: 'danger',
				title: '危险按钮',
			},
			{
				type: 'warning',
				title: '警告按钮',
			},
		];

		const state = reactive({
			btnList,
		});

    function handleClick(row) {
      V3Message.success({
				message: row.type,
			});
    }

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 可自定义边框

```vue demo
<template>
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" :borderType="v.borderType"
>
			{{ v.title }}
		</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'default',
				borderType: 'dashed',
				title: '虚线边框',
			},
			{
				type: 'default',
				borderType: 'dotted',
				title: '点边框',
			},
		];

		const state = reactive({
			btnList,
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
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" :disabled="v.disabled">
			{{ v.title }}
		</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'default',
				disabled: true,
				title: '默认按钮 + 禁用',
			},
			{
				type: 'info',
				disabled: true,
				title: '信息按钮 + 禁用',
			},
			{
				type: 'primary',
				disabled: true,
				title: '主按钮 + 禁用',
			},
			{
				type: 'success',
				disabled: true,
				title: '成功按钮 + 禁用',
			},
			{
				type: 'danger',
				disabled: true,
				title: '危险按钮 + 禁用',
			},
			{
				type: 'warning',
				disabled: true,
				title: '警告按钮 + 禁用',
			},
		];

		const state = reactive({
			btnList,
		});

		return {
			state,
		};
	},
});
</script>
```

### 朴素按钮

```vue demo
<template>
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" :plain="v.plain">
			{{ v.title }}
		</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'default',
				plain: true,
				title: '默认按钮 + 朴素',
			},
			{
				type: 'info',
				plain: true,
				title: '信息按钮 + 朴素',
			},
			{
				type: 'primary',
				plain: true,
				title: '主按钮 + 朴素',
			},
			{
				type: 'success',
				plain: true,
				title: '成功按钮 + 朴素',
			},
			{
				type: 'danger',
				plain: true,
				title: '危险按钮 + 朴素',
			},
			{
				type: 'warning',
				plain: true,
				title: '警告按钮 + 朴素',
			},
		];

		const state = reactive({
			btnList,
		});

		return {
			state,
		};
	},
});
</script>
```

### 文字按钮

```vue demo
<template>
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type">
			{{ v.title }}
		</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'text',
				title: '文字按钮',
			},
		];

		const state = reactive({
			btnList,
		});

		return {
			state,
		};
	},
});
</script>
```

### 带图标的文字按钮

```vue demo
<template>
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" :icon="v.icon">
			{{ v.title }}
		</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'text',
				title: '文字按钮 + 图标',
				icon: 'v3-icon-search',
			},
			{
				type: 'text',
				title: '文字按钮 + 图标',
				icon: 'v3-icon-link',
			},
		];

		const state = reactive({
			btnList,
		});

		return {
			state,
		};
	},
});
</script>
```

### 纯图标按钮

```vue demo
<template>
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" :icon="v.icon">
			{{ v.title }}
		</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'default',
				icon: 'v3-icon-search',
			},
			{
				type: 'info',
				icon: 'v3-icon-prompt',
			},
			{
				type: 'primary',
				icon: 'v3-icon-upload',
			},
			{
				type: 'success',
				icon: 'v3-icon-assessed-badge',
			},
			{
				type: 'danger',
				icon: 'v3-icon-close',
			},
			{
				type: 'warning',
				icon: 'v3-icon-warning',
			},
		];

		const state = reactive({
			btnList,
		});

		return {
			state,
		};
	},
});
</script>
```

### 加载中

```vue demo
<template>
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" :loading="true" :plain="v.plain">
			{{ v.title }}
		</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'default',
				plain: true,
				title: '朴素按钮 + 图标',
				loading: false,
			},
			{
				type: 'info',
				plain: true,
				title: '朴素按钮 + 图标',
				loading: false,
			},
			{
				type: 'primary',
				plain: true,
				title: '朴素按钮 + 图标',
				loading: false,
			},
			{
				type: 'success',
				plain: true,
				title: '朴素按钮 + 图标',
				loading: false,
			},
			{
				type: 'danger',
				plain: true,
				title: '朴素按钮 + 图标',
				loading: false,
			},
			{
				type: 'warning',
				plain: true,
				title: '朴素按钮 + 图标',
				loading: false,
			},
		];

		const state = reactive({
			btnList,
		});

		return {
			state,
		};
	},
});
</script>
```

### 按钮组

```vue demo
<template>
	<v3-space :size="12">
		<v3-button-group>
      <v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" :icon="v.icon">
        {{ v.title }}
      </v3-button>
    </v3-button-group>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'primary',
				title: '上一页',
				icon: 'v3-icon-arrow-left',
			},
			{
				type: 'primary',
				title: '全选',
				icon: 'v3-icon-assessed-badge',
			},
			{
				type: 'primary',
				title: '下一页',
				icon: 'v3-icon-arrow-right',
			},
		];

		const state = reactive({
			btnList,
		});

		return {
			state,
		};
	},
});
</script>
```

### 不同尺寸的按钮

```vue demo
<template>
	<v3-space :size="12">
		<v3-button v-for="v in state.btnList" :key="v.type" :type="v.type" :size="v.size">
      {{ v.title }}
    </v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const btnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'primary',
				title: '小尺寸',
				size: 'small',
			},
			{
				type: 'primary',
				title: '中尺寸',
				size: 'medium',
			},
			{
				type: 'primary',
				title: '大尺寸',
				size: 'large',
			},
		];

		const state = reactive({
			btnList,
		});

		return {
			state,
		};
	},
});
</script>
```

### API

#### Button 参数

| 参数名     | 说明                | 类型    | 可选值                                           | 默认值  |
| ---------- | ------------------- | ------- | ------------------------------------------------ | ------- |
| type       | 按钮的类型          | string  | default/primary/success/danger/warning/info/text | default |
| nativeType | 按钮的原生类型      | string  | button/submit/reset/menu                         | button  |
| borderType | 边框类型            | string  | ''/solid/dashed/dotted/double/groove/outset      | ''      |
| disabled   | 按钮是否禁用        | boolean |                                                  | false   |
| plain      | 是否为朴素按钮      | boolean |                                                  | false   |
| icon       | 按钮上的图标        | string  |                                                  | ''      |
| circle     | 是否为圆形按钮      | boolean |                                                  | false   |
| loading    | 按钮的 loading 状态 | boolean |                                                  | false   |
| size       | 按钮尺寸            | string  | small/medium/large                               | medium  |

#### Button 事件

同原生 `button` 的所有事件

#### Button 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 |        |

#### ButtonGroup 插槽

| 插槽名  | 说明     | 子标签 |
| ------- | -------- | ------ |
| default | 默认插槽 | Button |
