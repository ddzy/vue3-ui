<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-button
					type="primary"
					@click="state.showDrawer1 = !state.showDrawer1"
					>点我</v3-button
				>
				<v3-drawer
					v-model="state.showDrawer1"
					placement="top"
					title="标题"
					confirmText="loading后关闭"
					cancelText="1.5s后手动关闭"
					:confirmLoading="state.drawer1Loading"
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
			showDrawer1: false,
			drawer1Loading: false,
		});

		function handleConfirm() {
			state.drawer1Loading = true;
			setTimeout(() => {
				state.drawer1Loading = false;
				state.showDrawer1 = false;
			}, 3000);
		}

		function handleCancel(done: Function) {
			setTimeout(() => {
				done();
			}, 1500);
		}

		return {
			state,
			handleConfirm,
			handleCancel,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
