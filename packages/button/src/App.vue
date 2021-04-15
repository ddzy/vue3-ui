<template>
	<div class="button-container">
		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.defaultBtnList"
				:key="v.type"
				:type="v.type"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.defaultAndCustomBorderBtnList"
				:key="v.type"
				:type="v.type"
				:borderType="v.borderType"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.defaultAndDisabledBtnList"
				:key="v.type"
				:type="v.type"
				:disabled="v.disabled"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.plainBtnList"
				:key="v.type"
				:type="v.type"
				:plain="v.plain"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.plainAndIconBtnList"
				:key="v.type"
				:type="v.type"
				:plain="v.plain"
				:icon="v.icon"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.textBtnList"
				:key="v.type"
				:type="v.type"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.textAndDisabledBtnList"
				:key="v.type"
				:type="v.type"
				:disabled="v.disabled"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.textAndIconBtnList"
				:key="v.type"
				:type="v.type"
				:icon="v.icon"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.iconBtnList"
				:key="v.type"
				:type="v.type"
				:icon="v.icon"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.iconAndCircleBtnList"
				:key="v.type"
				:type="v.type"
				:icon="v.icon"
				:circle="v.circle"
			></v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in state.plainAndLoadingBtnList"
				:key="v.type"
				:type="v.type"
				:loading="v.loading"
				:plain="v.plain"
				@click="handleLoadingBtnClick(v.type)"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<v3-button-group>
			<v3-button
				class="button__item"
				v-for="v in state.buttonGroupList"
				:key="v.type"
				:type="v.type"
				:icon="v.icon"
			>
				{{ v.title }}
			</v3-button>
		</v3-button-group>
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
		const defaultBtnList: Array<{
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
		const defaultAndCustomBorderBtnList: Array<{
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
		const defaultAndDisabledBtnList: Array<{
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
		const plainBtnList: Array<{
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
		const plainAndIconBtnList: Array<{
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
		const textBtnList: Array<{
			type: string;
			title: string;
		}> = [
			{
				type: 'text',
				title: '文字按钮',
			},
		];
		// 文字按钮 + 禁用按钮列表
		const textAndDisabledBtnList: Array<{
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
		const textAndIconBtnList: Array<{
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
		const iconBtnList: Array<{
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
		const iconAndCircleBtnList: Array<{
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
		const plainAndLoadingBtnList: Array<{
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
		const buttonGroupList: Array<{
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

		const state = reactive({
			defaultBtnList,
			defaultAndCustomBorderBtnList,
			defaultAndDisabledBtnList,
			plainBtnList,
			plainAndIconBtnList,
			textBtnList,
			textAndDisabledBtnList,
			textAndIconBtnList,
			iconBtnList,
			iconAndCircleBtnList,
			plainAndLoadingBtnList,
			buttonGroupList,
		});

		function handleLoadingBtnClick(type: string) {
			state.plainAndLoadingBtnList = state.plainAndLoadingBtnList.map(v => {
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
.button-container {
	.button__list {
		display: flex;
		justify-content: flex-start;
		&:not(:first-child) {
			margin-top: 20px;
		}
		.button__item {
			margin-left: 12px;
		}
	}
}
</style>
