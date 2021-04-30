<template>
	<div class="input-demo-container">
		<div class="demo__inner">
			<v3-input
				v-model="state.inputValue"
				:maxlength="10"
				:showWordLimit="true"
				:clearable="false"
				:showPassword="true"
				:prefixIcon="'v3-icon-search'"
			></v3-input>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
	components: {},
	setup(props, context) {
		const state = reactive({
			inputValue: '测试值123456789',
		});

		return {
			state,
		};
	},
});
</script>
<style lang="scss" scoped>
.demo__inner {
	width: 200px;
	margin-top: 20px;
}
</style>
