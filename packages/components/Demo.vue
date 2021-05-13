<template>
	<div class="demo-container">
		<div class="demo__item">
			<v3-demo-block :hasCopy="true" :hasCodeSandbox="true" :code="state.code">
				<template #default>
					<v3-button>默认按钮</v3-button>
					<v3-button type="primary">主按钮</v3-button>
				</template>
				<template #description>
					按钮有六种类型，分别是【默认】、【主要】、【危险】、【成功】、【警告】、【信息】
				</template>
			</v3-demo-block>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const json = {
			a: 1,
			b: 2,
		};
		const state = {
			code: `${JSON.stringify(json, null, 2)}`,
		};

		return {
			state,
		};
	},
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
