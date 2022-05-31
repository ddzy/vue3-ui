## 抽屉（Drawr）

### 基本用法

```vue demo
<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
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
			</v3-col>
		</v3-row>
	</div>
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