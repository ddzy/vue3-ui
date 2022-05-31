## 抽屉（Drawr）

### 基本用法

```vue demo
<template>
	<v3-button
		type="primary"
		@click="state.showDrawer = !state.showDrawer"
		>点我</v3-button
	>
	<v3-drawer
		v-model="state.showDrawer"
		placement="top"
		title="标题"
		confirmText="确定"
		cancelText="关闭"
		:confirmLoading="state.drawerLoading"
		:onConfirm="handleConfirm"
		:onCancel="handleCancel"
	>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
		iusto sequi pariatur quaerat numquam, nulla minus recusandae
		voluptatibus, reprehenderit voluptate quos quisquam at ratione illum
		ipsa id a ducimus quam? Placeat minus, soluta quas, asperiores
		consequatur reprehenderit repellendus veritatis aperiam sit debitis
		error reiciendis quos accusamus et, dicta assumenda nesciunt
		exercitationem alias praesentium voluptatum? Beatae accusamus sit
		voluptatum facere assumenda!
	</v3-drawer>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showDrawer: false,
			drawerLoading: false,
		});

		function handleConfirm() {
			state.drawerLoading = true;
			setTimeout(() => {
				state.drawerLoading = false;
				state.showDrawer = false;
			}, 3000);
		}

		function handleCancel(done: Function) {
			done();
		}

		return {
			state,
			handleConfirm,
			handleCancel,
		};
	},
});
</script>
```

### 不同方向

```vue demo
<template>
	<v3-radio-group v-model="state.placement">
		<v3-radio label="left">左</v3-radio>
		<v3-radio label="bottom">下</v3-radio>
		<v3-radio label="right">右</v3-radio>
		<v3-radio label="top">上</v3-radio>
	</v3-radio-group>
	<v3-button
		type="primary"
		@click="state.showDrawer = !state.showDrawer"
		>打开</v3-button
	>
	<v3-drawer
		v-model="state.showDrawer"
		title="标题"
		:placement="state.placement"
	>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto
		iusto sequi pariatur quaerat numquam, nulla minus recusandae
		voluptatibus, reprehenderit voluptate quos quisquam at ratione illum
		ipsa id a ducimus quam? Placeat minus, soluta quas, asperiores
		consequatur reprehenderit repellendus veritatis aperiam sit debitis
		error reiciendis quos accusamus et, dicta assumenda nesciunt
		exercitationem alias praesentium voluptatum? Beatae accusamus sit
		voluptatum facere assumenda!
	</v3-drawer>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			showDrawer: false,
			placement: 'right',
		});
		return {
			state,
		};
	},
});
</script>
```