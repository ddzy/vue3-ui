<template>
	<div class="button-container">
		<div class="button__list">
			<V3Button
				class="button__item"
				type="default"
				@click="handleClick($event, 'default')"
			>
				默认按钮
			</V3Button>
			<V3Button
				class="button__item"
				type="info"
				@click="handleClick($event, 'info')"
			>
				信息按钮
			</V3Button>
			<V3Button
				class="button__item"
				type="primary"
				@click="handleClick($event, 'primary')"
			>
				主按钮
			</V3Button>
			<V3Button
				class="button__item"
				type="success"
				@click="handleClick($event, 'success')"
			>
				成功按钮
			</V3Button>
			<V3Button
				class="button__item"
				type="danger"
				@click="handleClick($event, 'danger')"
			>
				危险按钮
			</V3Button>
			<V3Button
				class="button__item"
				type="warning"
				@click="handleClick($event, 'warning')"
			>
				警告按钮
			</V3Button>

			<V3Button class="button__item" borderType="dashed">
				默认按钮 + 虚线边框
			</V3Button>
			<V3Button class="button__item" borderType="dotted">
				默认按钮 + 点边框
			</V3Button>
		</div>

		<div class="button__list">
			<V3Button
				class="button__item"
				type="default"
				:disabled="true"
				@click="handleClick($event, 'default')"
			>
				默认按钮 + 禁用
			</V3Button>
			<V3Button
				class="button__item"
				type="info"
				:disabled="true"
				@click="handleClick($event, 'info')"
			>
				信息按钮 + 禁用
			</V3Button>
			<V3Button
				class="button__item"
				type="primary"
				:disabled="true"
				@click="handleClick($event, 'primary')"
			>
				主按钮 + 禁用
			</V3Button>
			<V3Button
				class="button__item"
				type="success"
				:disabled="true"
				@click="handleClick($event, 'success')"
			>
				成功按钮 + 禁用
			</V3Button>
			<V3Button
				class="button__item"
				type="danger"
				:disabled="true"
				@click="handleClick($event, 'danger')"
			>
				危险按钮 + 禁用
			</V3Button>
			<V3Button
				class="button__item"
				type="warning"
				:disabled="true"
				@click="handleClick($event, 'warning')"
			>
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
			<V3Button
				class="button__item"
				type="default"
				:plain="true"
				@click="handleClick($event, 'default')"
			>
				默认按钮 + 朴素
			</V3Button>
			<V3Button
				class="button__item"
				type="info"
				:plain="true"
				@click="handleClick($event, 'info')"
			>
				信息按钮 + 朴素
			</V3Button>
			<V3Button
				class="button__item"
				type="primary"
				:plain="true"
				@click="handleClick($event, 'primary')"
			>
				主按钮 + 朴素
			</V3Button>
			<V3Button
				class="button__item"
				type="success"
				:plain="true"
				@click="handleClick($event, 'success')"
			>
				成功按钮 + 朴素
			</V3Button>
			<V3Button
				class="button__item"
				type="danger"
				:plain="true"
				@click="handleClick($event, 'danger')"
			>
				危险按钮 + 朴素
			</V3Button>
			<V3Button
				class="button__item"
				type="warning"
				:plain="true"
				@click="handleClick($event, 'warning')"
			>
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
			<V3Button
				class="button__item"
				type="text"
				@click="handleClick($event, 'default')"
			>
				文字按钮
			</V3Button>
			<V3Button
				class="button__item"
				type="text"
				:disabled="true"
				@click="handleClick($event, 'default')"
			>
				文字按钮 + 禁用
			</V3Button>
		</div>

		<div class="button__list">
			<V3Button
				class="button__item"
				:type="'default'"
				:icon="'v3-icon-search'"
				:plain="true"
				@click="handleClick($event, 'default')"
			>
				默认按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="info"
				:icon="'v3-icon-prompt'"
				:plain="true"
				@click="handleClick($event, 'info')"
			>
				信息按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="primary"
				:icon="'v3-icon-upload'"
				:plain="true"
				@click="handleClick($event, 'primary')"
			>
				主按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="success"
				:plain="true"
				:icon="'v3-icon-assessed-badge'"
				@click="handleClick($event, 'success')"
			>
				成功按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="danger"
				:plain="true"
				:icon="'v3-icon-close'"
				@click="handleClick($event, 'danger')"
			>
				危险按钮 + 朴素 + 图标
			</V3Button>
			<V3Button
				class="button__item"
				type="warning"
				:plain="true"
				:icon="'v3-icon-warning'"
				@click="handleClick($event, 'warning')"
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
		function handleClick(e, type) {
			console.log('{ e, type } :>> ', { e, type });
		}

		return {
			handleClick,
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
