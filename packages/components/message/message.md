## 消息提示（Message）

### 基本用法

```vue demo
<template>
  <v3-space :size="12">
		<v3-button type="success" @click="handleClick('success')"
			>成功</v3-button
		>
		<v3-button type="danger" @click="handleClick('danger')"
			>失败</v3-button
		>
		<v3-button type="warning" @click="handleClick('warning')"
			>警告</v3-button
		>
		<v3-button type="info" @click="handleClick('info')">提示</v3-button>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
		});
    const app = ref(getCurrentInstance()).value;

    function handleClick(type: string) {
      app && app.proxy.$message({
        type,
        message: `这是一条 ${type} 消息`,
        duration: 1000,
      })
    }

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 内容可以是 VNode

```vue demo
<template>
  <v3-space :size="12">
		<v3-button type="success" @click="handleClick"
			>成功</v3-button
		>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
		});
    const app = ref(getCurrentInstance()).value;

    function handleClick() {
      app && app.proxy.$message({
        type: 'success',
				message: h('span', {
          style: {
            color: 'red',
          },
        }, '内容可以是 VNode~'),
      })
    }

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 可以手动关闭

```vue demo
<template>
  <v3-space :size="12">
		<v3-button type="success" @click="handleClick"
			>成功</v3-button
		>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
		});
    const app = ref(getCurrentInstance()).value;

    function handleClick() {
      app && app.proxy.$message({
        type: 'success',
				message: '可以手动关闭',
				showClose: true,
        duration: 0,
      })
    }

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 文本居中

```vue demo
<template>
  <v3-space :size="12">
		<v3-button type="success" @click="handleClick"
			>成功</v3-button
		>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
		});
    const app = ref(getCurrentInstance()).value;

    function handleClick() {
      app && app.proxy.$message({
        type: 'success',
				message: '文本居中',
				center: true,
      })
    }

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 可以传入 HTML 片段

```vue demo
<template>
  <v3-space :size="12">
		<v3-button type="success" @click="handleClick"
			>成功</v3-button
		>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
		});
    const app = ref(getCurrentInstance()).value;

    function handleClick() {
      app && app.proxy.$message({
        type: 'success',
				message: `
					<p>可以传入 <mark>HTML</mark> 片段~</p>
				`,
				dangerouslyUseHTMLString: true,
      })
    }

		return {
			state,
      handleClick,
		};
	},
});
</script>
```

### 可通过 onClose 事件来阻止关闭

```vue demo
<template>
  <v3-space :size="12">
		<v3-button type="success" @click="handleClick"
			>成功</v3-button
		>
	</v3-space>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, h } from 'vue';

export default defineComponent({
  setup() {
		const state = reactive({
		});
    const app = ref(getCurrentInstance()).value;

    function handleClick() {
      app && app.proxy.$message({
        type: 'success',
				message: `
					可通过 <mark>onClose</mark> 方法阻止关闭~
				`,
				dangerouslyUseHTMLString: true,
				onClose(done) {
					setTimeout(() => {
						done();
					}, 2000);
				},
      })
    }

		return {
			state,
      handleClick,
		};
	},
});
</script>
```