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
			<v3-button type="danger">危险</v3-button>
		</div>
		<div class="demo__inner">
			<v3-button type="text">点我跳转</v3-button>
		</div>
		<div class="demo__inner">
			<v3-button icon="v3-icon-editor" type="success" circle></v3-button>
		</div>
		<div class="demo__inner">
			<v3-radio v-model="state.radioValue" :label="1" @change="handleChange"
				>单选1</v3-radio
			>
			<v3-radio
				v-model="state.radioValue"
				:label="2"
				:disabled="true"
				@change="handleChange"
				>单选2</v3-radio
			>
			<v3-radio v-model="state.radioValue" :label="3" @change="handleChange"
				>单选3</v3-radio
			>
			<v3-radio v-model="state.radioValue" :label="4" @change="handleChange"
				>单选4</v3-radio
			>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Radio from './components/Radio.vue';

export default defineComponent({
	components: {
		V3Radio,
	},
	setup(props, context) {
		const state = reactive({
			inputValue: '测试值123456789',
			radioValue: 2,
		});

		function handleChange(e) {
			console.log('e :>> ', e);
		}

		return {
			state,
			handleChange,
		};
	},
});
</script>
<style lang="scss" scoped>
.demo__inner {
	min-width: 200px;
	margin-top: 20px;
}
</style>
