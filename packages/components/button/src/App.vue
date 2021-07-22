<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>默认按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button v-for="v in state.btnList1" :key="v.type" :type="v.type">
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>可自定义边框：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList2"
						:key="v.type"
						:type="v.type"
						:borderType="v.borderType"
					>
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>禁用状态：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList3"
						:key="v.type"
						:type="v.type"
						:disabled="v.disabled"
					>
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>朴素按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList4"
						:key="v.type"
						:type="v.type"
						:plain="v.plain"
					>
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>带图标的朴素按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList5"
						:key="v.type"
						:type="v.type"
						:plain="v.plain"
						:icon="v.icon"
					>
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>文字按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button v-for="v in state.btnList6" :key="v.type" :type="v.type">
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>禁用的文字按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList7"
						:key="v.type"
						:type="v.type"
						:disabled="v.disabled"
					>
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>带图标的文字按钮</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList8"
						:key="v.type"
						:type="v.type"
						:icon="v.icon"
					>
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>纯图标按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList9"
						:key="v.type"
						:type="v.type"
						:icon="v.icon"
					>
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>圆形图标按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList10"
						:key="v.type"
						:type="v.type"
						:icon="v.icon"
						:circle="v.circle"
					></v3-button>
				</v3-space>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>加载中的按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-button
					class="btn__item"
					v-for="v in state.btnList11"
					:key="v.type"
					:type="v.type"
					:loading="v.loading"
					:plain="v.plain"
					@click="handleLoadingBtnClick(v.type)"
				>
					{{ v.title }}
				</v3-button>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>按钮组：</h3>
			</v3-col>
			<v3-col>
				<v3-button-group>
					<v3-button
						v-for="v in state.btnList12"
						:key="v.type"
						:type="v.type"
						:icon="v.icon"
					>
						{{ v.title }}
					</v3-button>
				</v3-button-group>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col :span="12">
				<h3>不同尺寸的按钮：</h3>
			</v3-col>
			<v3-col>
				<v3-space :size="12">
					<v3-button
						v-for="v in state.btnList13"
						:key="v.type"
						:type="v.type"
						:size="v.size"
					>
						{{ v.title }}
					</v3-button>
				</v3-space>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Button from './components/Button.vue';
import V3ButtonGroup from './components/ButtonGroup.vue';

export default defineComponent({
	components: {
		V3Button,
		V3ButtonGroup,
	},
	setup() {
		// 默认图标列表
		const btnList1: Array<{
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
		// 默认按钮 + 自定义边框列表
		const btnList2: Array<{
			type: string;
			borderType: string;
			title: string;
		}> = [
			{
				type: 'default',
				borderType: 'dashed',
				title: '默认按钮 + 虚线边框',
			},
			{
				type: 'default',
				borderType: 'dotted',
				title: '默认按钮 + 点边框',
			},
		];
		// 默认按钮 + 禁用列表
		const btnList3: Array<{
			type: string;
			disabled: boolean;
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
		// 朴素按钮列表
		const btnList4: Array<{
			type: string;
			plain: boolean;
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
		// 朴素按钮 + 图标列表
		const btnList5: Array<{
			type: string;
			plain: boolean;
			title: string;
			icon: string;
		}> = [
			{
				type: 'default',
				plain: true,
				title: '朴素按钮 + 图标',
				icon: 'v3-icon-search',
			},
			{
				type: 'info',
				plain: true,
				title: '朴素按钮 + 图标',
				icon: 'v3-icon-prompt',
			},
			{
				type: 'primary',
				plain: true,
				title: '朴素按钮 + 图标',
				icon: 'v3-icon-upload',
			},
			{
				type: 'success',
				plain: true,
				title: '朴素按钮 + 图标',
				icon: 'v3-icon-assessed-badge',
			},
			{
				type: 'danger',
				plain: true,
				title: '朴素按钮 + 图标',
				icon: 'v3-icon-close',
			},
			{
				type: 'warning',
				plain: true,
				title: '朴素按钮 + 图标',
				icon: 'v3-icon-warning',
			},
		];
		// 文字按钮列表
		const btnList6: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'text',
				title: '文字按钮',
			},
		];
		// 文字按钮 + 禁用按钮列表
		const btnList7: Array<{
			type: string;
			title: string;
			disabled: boolean;
		}> = [
			{
				type: 'text',
				title: '文字按钮 + 禁用',
				disabled: true,
			},
		];
		// 文字按钮 + 图标列表
		const btnList8: Array<{
			type: string;
			title: string;
			icon: string;
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
		// 纯图标按钮
		const btnList9: Array<{
			type: string;
			icon: string;
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
		// 纯图标按钮 + 圆形
		const btnList10: Array<{
			type: string;
			icon: string;
			circle: boolean;
		}> = [
			{
				type: 'default',
				icon: 'v3-icon-search',
				circle: true,
			},
			{
				type: 'info',
				icon: 'v3-icon-prompt',
				circle: true,
			},
			{
				type: 'primary',
				icon: 'v3-icon-upload',
				circle: true,
			},
			{
				type: 'success',
				icon: 'v3-icon-assessed-badge',
				circle: true,
			},
			{
				type: 'danger',
				icon: 'v3-icon-close',
				circle: true,
			},
			{
				type: 'warning',
				icon: 'v3-icon-warning',
				circle: true,
			},
		];
		// 朴素按钮 + loading
		const btnList11: Array<{
			type: string;
			plain: boolean;
			title: string;
			loading: boolean;
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
		const btnList12: Array<{
			type: string;
			title: string;
			icon: string;
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
		// 不同尺寸的按钮
		const btnList13: Array<{
			type: string;
			title: string;
			size: string;
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
			btnList1,
			btnList2,
			btnList3,
			btnList4,
			btnList5,
			btnList6,
			btnList7,
			btnList8,
			btnList9,
			btnList10,
			btnList11,
			btnList12,
			btnList13,
		});

		function handleLoadingBtnClick(type: string) {
			state.btnList11 = state.btnList11.map(v => {
				if (v.type === type) {
					return {
						...v,
						loading: true,
					};
				} else {
					return {
						...v,
						loading: false,
					};
				}
			});
		}

		return {
			state,
			handleLoadingBtnClick,
		};
	},
});
</script>
<style lang="scss" scoped>
.demo-container {
	.btn__item {
		display: inline-block;
		margin-right: 12px;
	}
}
</style>
