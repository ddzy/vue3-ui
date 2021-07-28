<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col>
				<v3-base-popper>
					<v3-button type="primary">触发</v3-button>
					<template #content>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
						eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
						excepturi repudiandae culpa veritatis praesentium porro libero
						inventore? Quasi debitis provident consequatur?
					</template>
				</v3-base-popper>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>不同的触发方式：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-base-popper trigger="mouseenter">
						<v3-button type="primary">mouseenter 触发</v3-button>
						<template #content>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
							eveniet nesciunt amet, rem consectetur quod perferendis harum
							fugit excepturi repudiandae culpa veritatis praesentium porro
							libero inventore? Quasi debitis provident consequatur?
						</template>
					</v3-base-popper>

					<v3-base-popper trigger="click">
						<v3-button type="primary">click 触发</v3-button>
						<template #content>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
							eveniet nesciunt amet, rem consectetur quod perferendis harum
							fugit excepturi repudiandae culpa veritatis praesentium porro
							libero inventore? Quasi debitis provident consequatur?
						</template>
					</v3-base-popper>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>纯手动控制：</h3>
			</v3-col>
			<v3-col>
				<v3-base-popper trigger="manual" v-model="state.popperValue1">
					<v3-button type="primary" @click="state.popperValue1 = true"
						>触发</v3-button
					>
					<template #content>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
						eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
						excepturi repudiandae culpa veritatis praesentium porro libero
						inventore? Quasi debitis provident consequatur?
					</template>
				</v3-base-popper>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>两种内置主题：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-base-popper placement="bottom" theme="dark">
						<v3-button type="primary">黑色主题</v3-button>
						<template #content>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
							eveniet nesciunt amet, rem consectetur quod perferendis harum
							fugit excepturi repudiandae culpa veritatis praesentium porro
							libero inventore? Quasi debitis provident consequatur?
						</template>
					</v3-base-popper>

					<v3-base-popper placement="bottom" theme="light">
						<v3-button type="primary">白色主题</v3-button>
						<template #content>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
							eveniet nesciunt amet, rem consectetur quod perferendis harum
							fugit excepturi repudiandae culpa veritatis praesentium porro
							libero inventore? Quasi debitis provident consequatur?
						</template>
					</v3-base-popper>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>禁用：</h3>
			</v3-col>
			<v3-col>
				<v3-base-popper disabled>
					<v3-button type="primary">触发</v3-button>
					<template #content>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
						eveniet nesciunt amet, rem consectetur quod perferendis harum fugit
						excepturi repudiandae culpa veritatis praesentium porro libero
						inventore? Quasi debitis provident consequatur?
					</template>
				</v3-base-popper>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			popperValue1: false,
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped>
.content {
	.action {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		:deep(.v3-button) {
			&:not(:first-child) {
				margin-left: 12px;
			}
		}
	}
}
</style>
