<template>
	<div class="demo-container">
		<div class="demo__item">
			<v3-demo-block>
				<template #default>
					<v3-button>默认按钮</v3-button>
					<v3-button type="primary">主按钮</v3-button>
				</template>
				<template #description>
					简单描述简单描述
				</template>
			</v3-demo-block>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {},
});
</script>
<style lang="scss" scoped>
.demo__item {
	width: 500px;
	.v3-button {
		margin-left: 12px;
	}
}
</style>
