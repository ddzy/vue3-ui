<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-space :size="40">
					<v3-badge :value="9">
						<v3-button plain>按钮1</v3-button>
					</v3-badge>
					<v3-badge :value="99" type="success">
						<v3-button plain>按钮1</v3-button>
					</v3-badge>
					<v3-badge :value="999" type="danger">
						<v3-button plain>按钮1</v3-button>
					</v3-badge>
					<v3-badge :value="9999" type="warning">
						<v3-button plain>按钮1</v3-button>
					</v3-badge>
					<v3-badge :value="99999" type="info">
						<v3-button plain>按钮1</v3-button>
					</v3-badge>
				</v3-space>
			</v3-col>
			<v3-col :span="12">
				<v3-space :size="30">
					<v3-badge :value="9">
						<v3-button type="primary">按钮1</v3-button>
					</v3-badge>
					<v3-badge :value="99" type="success">
						<v3-button type="success">按钮1</v3-button>
					</v3-badge>
					<v3-badge value="new1" type="warning">
						<v3-button type="text">按钮1</v3-button>
					</v3-badge>
					<v3-badge value="new2" type="info">
						<v3-button type="text">按钮1</v3-button>
					</v3-badge>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>圆点样式：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-space :size="30">
					<v3-badge dot type="primary">
						<v3-button type="primary" icon="v3-icon-assessed-badge"></v3-button>
					</v3-badge>
					<v3-badge dot type="success">
						<v3-button type="success" icon="v3-icon-cart-full"></v3-button>
					</v3-badge>
					<v3-badge dot type="danger">
						<v3-button
							type="danger"
							icon="v3-icon-CurrencyConverter"
						></v3-button>
					</v3-badge>
					<v3-badge dot type="warning">
						文本4
					</v3-badge>
					<v3-badge dot type="info">
						文本5
					</v3-badge>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>自定义颜色：</h3>
			</v3-col>
			<v3-col :span="12">
				<v3-space :size="30">
					<v3-badge backgroundColor="red" color="#fff" :value="9">
						<v3-button plain>按钮1</v3-button>
					</v3-badge>
					<v3-badge
						backgroundColor="pink"
						color="darkred"
						:value="99"
						type="success"
					>
						<v3-button plain>按钮1</v3-button>
					</v3-badge>
					<v3-badge
						backgroundColor="purple"
						color="#fff"
						:value="999"
						type="danger"
					>
						<v3-button plain>按钮1</v3-button>
					</v3-badge>
				</v3-space>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped>
.space-wrapper {
	border: 1px dashed rgba(184, 176, 176, 1);
}
.space-wrapper-2 {
	width: 200px;
}
</style>
