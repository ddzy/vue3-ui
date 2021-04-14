<template>
	<div class="button-container">
		<!-- <div class="button__list">
			<V3Button class="button__item" type="default">默认按钮</V3Button>
			<V3Button class="button__item" type="info">信息按钮</V3Button>
			<V3Button class="button__item" type="primary">主按钮</V3Button>
			<V3Button class="button__item" type="success">成功按钮</V3Button>
			<V3Button class="button__item" type="danger">危险按钮</V3Button>
			<V3Button class="button__item" type="warning">警告按钮</V3Button>

			<V3Button class="button__item" borderType="dashed">
				默认按钮 + 虚线边框
			</V3Button>
			<V3Button class="button__item" borderType="dotted">
				默认按钮 + 点边框
			</V3Button>
		</div>

		<div class="button__list">
			<V3Button class="button__item" type="default" :disabled="true">
				默认按钮 + 禁用
			</V3Button>
			<V3Button class="button__item" type="info" :disabled="true">
				信息按钮 + 禁用
			</V3Button>
			<V3Button class="button__item" type="primary" :disabled="true">
				主按钮 + 禁用
			</V3Button>
			<V3Button class="button__item" type="success" :disabled="true">
				成功按钮 + 禁用
			</V3Button>
			<V3Button class="button__item" type="danger" :disabled="true">
				危险按钮 + 禁用
			</V3Button>
			<V3Button class="button__item" type="warning" :disabled="true">
				警告按钮 + 禁用
			</V3Button>

			<V3Button class="button__item" borderType="dashed" :disabled="true">
				默认按钮 + 虚线边框 + 禁用
			</V3Button>
			<V3Button class="button__item" borderType="dotted" :disabled="true">
				默认按钮 + 点边框 + 禁用
			</V3Button>
		</div>

		<div class="button__list">
			<V3Button class="button__item" type="default" :plain="true">
				默认按钮 + 朴素
			</V3Button>
			<V3Button class="button__item" type="info" :plain="true">
				信息按钮 + 朴素
			</V3Button>
			<V3Button class="button__item" type="primary" :plain="true">
				主按钮 + 朴素
			</V3Button>
			<V3Button class="button__item" type="success" :plain="true">
				成功按钮 + 朴素
			</V3Button>
			<V3Button class="button__item" type="danger" :plain="true">
				危险按钮 + 朴素
			</V3Button>
			<V3Button class="button__item" type="warning" :plain="true">
				警告按钮 + 朴素
			</V3Button>

			<V3Button class="button__item" borderType="dashed" :plain="true">
				默认按钮 + 虚线边框 + 朴素
			</V3Button>
			<V3Button class="button__item" borderType="dotted" :plain="true">
				默认按钮 + 点边框 + 朴素
			</V3Button>
		</div>

		<div class="button__list">
			<V3Button class="button__item" type="text">文字按钮</V3Button>
			<V3Button class="button__item" type="text" :disabled="true">
				文字按钮 + 禁用
			</V3Button>
		</div>

		<div class="button__list">
			<V3Button
				class="button__item"
				:type="'default'"
				:icon="'v3-icon-search'"
				:plain="true"
			>
				默认按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="info"
				:icon="'v3-icon-prompt'"
				:plain="true"
			>
				信息按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="primary"
				:icon="'v3-icon-upload'"
				:plain="true"
			>
				主按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="success"
				:plain="true"
				:icon="'v3-icon-assessed-badge'"
			>
				成功按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="danger"
				:plain="true"
				:icon="'v3-icon-close'"
			>
				危险按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="warning"
				:plain="true"
				:icon="'v3-icon-warning'"
			>
				警告按钮 + 朴素 + 图标
			</V3Button>

			<V3Button
				class="button__item"
				borderType="dashed"
				:plain="true"
				:icon="'v3-icon-password'"
			>
				默认按钮 + 虚线边框 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				borderType="dotted"
				:plain="true"
				:icon="'v3-icon-pin'"
			>
				默认按钮 + 点边框 + 图标
			</V3Button>
		</div> -->

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

		return {
			defaultBtnList,
			defaultAndCustomBorderBtnList,
			defaultAndDisabledBtnList,
			plainBtnList,
			plainAndIconBtnList,
			textBtnList,
			textAndDisabledBtnList,
			textAndIconBtnList,
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
