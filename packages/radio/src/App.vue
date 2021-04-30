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
		<div class="demo__inner">
			<v3-button type="primary">提交</v3-button>
		</div>
		<div class="demo__inner">
			<v3-button type="text">点我跳转</v3-button>
		</div>
		<div class="demo__inner">
			<v3-button icon="v3-icon-editor" type="success" circle></v3-button>
		</div>
		<div class="demo__inner">
			<v3-radio :label="'1'">单选1</v3-radio>
			<v3-radio :label="'2'">单选1</v3-radio>
			<v3-radio :label="'3'">单选1</v3-radio>
			<v3-radio :label="'4'">单选1</v3-radio>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import V3Radio from './components/Radio.vue';

export default defineComponent({
	components: {
		V3Radio,
	},
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
