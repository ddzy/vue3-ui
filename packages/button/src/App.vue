<template>
	<div>
		<V3Button type="default">默认按钮</V3Button>
		<V3Button type="primary">主按钮</V3Button>
		<V3Button type="success">成功按钮</V3Button>
		<V3Button type="danger">危险按钮</V3Button>
		<V3Button type="warning">警告按钮</V3Button>
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
