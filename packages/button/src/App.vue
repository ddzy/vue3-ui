<template>
	<div class="button__list">
		<V3Button class="button__item" type="default">默认按钮</V3Button>
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import V3Button from './components/Button.vue';

export default defineComponent({
	components: {
		V3Button,
	},
	setup() {},
});
</script>
<style lang="scss" scoped>
.button__list {
	display: flex;
	justify-content: flex-start;
	.button__item {
		margin-left: 12px;
	}
}
</style>
