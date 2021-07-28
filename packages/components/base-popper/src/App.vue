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
			<v3-col style="margin-bottom: 12px" :span="12">
				<v3-radio-group v-model="state.radioValue1">
					<v3-radio :label="'hover'">hover</v3-radio>
					<v3-radio :label="'click'">click</v3-radio>
				</v3-radio-group>
			</v3-col>
			<v3-col>
				<v3-base-popper :trigger="state.radioValue1">
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
				<h3>纯手动控制：</h3>
			</v3-col>
			<v3-col>
				<v3-base-popper v-model="state.popperValue1">
					<v3-button
						type="primary"
						@click="state.popperValue1 = !state.popperValue1"
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
			<v3-col style="margin-bottom: 12px" :span="12">
				<v3-radio-group
					v-model="state.radioValue2"
					@change="state.popperValue2 = true"
				>
					<v3-radio :label="'dark'">dark</v3-radio>
					<v3-radio :label="'light'">light</v3-radio>
				</v3-radio-group>
			</v3-col>
			<v3-col>
				<v3-base-popper
					placement="bottom"
					v-model="state.popperValue2"
					:theme="state.radioValue2"
				>
					<v3-button
						type="primary"
						@click="state.popperValue2 = !state.popperValue2"
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
			radioValue1: 'hover',
			popperValue1: false,
			radioValue2: 'dark',
			popperValue2: false,
			popperValue3: false,
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
