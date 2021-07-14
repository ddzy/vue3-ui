<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>基本用法：</h3>
			</v3-col>
			<v3-col style="margin: 0 auto">
				<v3-row justify="center" :gutter="20">
					<v3-col>
						<v3-tooltip
							content="我是上左的内容。。。。。。"
							placement="top-start"
							v-model="state.showTopStart"
						>
							<v3-button plain>上左</v3-button>
						</v3-tooltip>
					</v3-col>
					<v3-col>
						<v3-tooltip content="上中" placement="top" v-model="state.showTop">
							<v3-button plain>上中</v3-button>
						</v3-tooltip>
					</v3-col>
					<v3-col>
						<v3-tooltip
							content="上右"
							placement="top-end"
							v-model="state.showTopEnd"
						>
							<v3-button plain>上右</v3-button>
						</v3-tooltip>
					</v3-col>
				</v3-row>
				<v3-row justify="space-between" :gutter="20">
					<v3-col>
						<v3-row justify="space-around" :gutter="20">
							<v3-col :span="12">
								<v3-tooltip
									content="左上"
									placement="left-start"
									v-model="state.showLeftStart"
								>
									<v3-button plain>左上</v3-button>
								</v3-tooltip>
							</v3-col>
							<v3-col style="margin-top: 20px" :span="12">
								<v3-tooltip
									content="左中"
									placement="left"
									v-model="state.showLeft"
								>
									<v3-button plain>左中</v3-button>
								</v3-tooltip>
							</v3-col>
							<v3-col style="margin-top: 20px" :span="12">
								<v3-tooltip
									content="左下"
									placement="left-end"
									v-model="state.showLeftEnd"
								>
									<v3-button plain>左下</v3-button>
								</v3-tooltip>
							</v3-col>
						</v3-row>
					</v3-col>
					<v3-col>
						<v3-row
							style="text-align: right;"
							justify="space-around"
							:gutter="20"
						>
							<v3-col :span="12">
								<v3-tooltip
									content="右上"
									placement="right-start"
									v-model="state.showRightStart"
								>
									<v3-button plain>右上</v3-button>
								</v3-tooltip>
							</v3-col>
							<v3-col style="margin-top: 20px" :span="12">
								<v3-tooltip
									content="右中"
									placement="right"
									v-model="state.showRight"
								>
									<v3-button plain>右中</v3-button>
								</v3-tooltip>
							</v3-col>
							<v3-col style="margin-top: 20px" :span="12">
								<v3-tooltip
									content="右下"
									placement="right-end"
									v-model="state.showRightEnd"
								>
									<v3-button plain>右下</v3-button>
								</v3-tooltip>
							</v3-col>
						</v3-row>
					</v3-col>
				</v3-row>
				<v3-row justify="center" :gutter="20">
					<v3-col>
						<v3-tooltip
							content="下左"
							placement="bottom-start"
							v-model="state.showBottomStart"
						>
							<v3-button plain>下左</v3-button>
						</v3-tooltip>
					</v3-col>
					<v3-col>
						<v3-tooltip
							content="下中"
							placement="bottom"
							v-model="state.showBottom"
						>
							<v3-button plain>下中</v3-button>
						</v3-tooltip>
					</v3-col>
					<v3-col>
						<v3-tooltip
							content="下右"
							placement="bottom-end"
							v-model="state.showBottomEnd"
						>
							<v3-button plain>下右</v3-button>
						</v3-tooltip>
					</v3-col>
				</v3-row>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRef, watch } from 'vue';

export default defineComponent({
	setup(props, context) {
		const state = reactive({
			showTop: false,
			showTopStart: false,
			showTopEnd: false,
			showRight: false,
			showRightStart: false,
			showRightEnd: false,
			showBottom: false,
			showBottomStart: false,
			showBottomEnd: false,
			showLeft: false,
			showLeftStart: false,
			showLeftEnd: false,
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
