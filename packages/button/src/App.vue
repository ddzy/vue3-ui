<template>
	<div class="button-container">
		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in defaultBtnList"
				:key="v.type"
				:type="v.type"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in defaultAndCustomBorderBtnList"
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
				v-for="v in defaultAndDisabledBtnList"
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
				v-for="v in plainBtnList"
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
				v-for="v in plainAndIconBtnList"
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
				v-for="v in textBtnList"
				:key="v.type"
				:type="v.type"
			>
				{{ v.title }}
			</v3-button>
		</div>

		<div class="button__list">
			<v3-button
				class="button__item"
				v-for="v in textAndDisabledBtnList"
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
				v-for="v in textAndIconBtnList"
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
				v-for="v in iconBtnList"
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
				v-for="v in iconAndCircleBtnList"
				:key="v.type"
				:type="v.type"
				:icon="v.icon"
				:circle="v.circle"
			></v3-button>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import V3Button from './components/Button.vue';

export default defineComponent({
	components: {
		V3Button,
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

		return {
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
