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
			<v3-radio
				v-model="state.radioValue"
				:label="1"
				:border="true"
				@change="handleChange"
				>单选1</v3-radio
			>
			<v3-radio
				v-model="state.radioValue"
				:label="2"
				:border="true"
				:disabled="true"
				@change="handleChange"
				>单选2</v3-radio
			>
			<v3-radio
				v-model="state.radioValue"
				:label="3"
				:border="true"
				@change="handleChange"
				>单选3</v3-radio
			>
			<v3-radio
				v-model="state.radioValue"
				:label="4"
				:border="true"
				@change="handleChange"
				>单选4</v3-radio
			>
		</div>
		<div class="demo__inner">
			<v3-radio-group v-model="state.radioValue2" @change="handleChange">
				<v3-radio :label="1">单选1</v3-radio>
				<v3-radio :label="2">单选2</v3-radio>
				<v3-radio :label="3">单选3</v3-radio>
				<v3-radio :label="4">单选4</v3-radio>
			</v3-radio-group>
		</div>
		<div class="demo__inner">
			<v3-radio-group v-model="state.radioValue3" @change="handleChange">
				<v3-radio-button :label="1" :disabled="true">单选1</v3-radio-button>
				<v3-radio-button :label="2">单选2</v3-radio-button>
				<v3-radio-button :label="3">单选3</v3-radio-button>
				<v3-radio-button :label="4">单选4</v3-radio-button>
			</v3-radio-group>
		</div>
		<div class="demo__inner">
			<v3-checkbox
				v-model="state.radioValue4"
				:defaultIcon="'v3-icon-like'"
				:selectedIcon="'v3-icon-like1'"
				:indeterminatedIcon="'v3-icon-sami-select'"
				>多选1</v3-checkbox
			>
			<v3-checkbox v-model="state.radioValue5" :indeterminate="true"
				>多选2</v3-checkbox
			>
			<v3-checkbox v-model="state.radioValue6" :disabled="true"
				>多选3</v3-checkbox
			>
			<v3-checkbox v-model="state.radioValue7">多选4</v3-checkbox>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRef, watch } from 'vue';
import V3Checkbox from './components/Checkbox.vue';

export default defineComponent({
	components: {
		V3Checkbox,
	},
	setup(props, context) {
		const state = reactive({
			inputValue: '测试值123456789',
			radioValue: 3,
			radioValue2: 2,
			radioValue3: 1,
			radioValue4: true,
			radioValue5: true,
			radioValue6: false,
			radioValue7: false,
		});

		watch(toRef(state, 'radioValue4'), newValue => {
			console.log('state.radioValue4 :>> ', state.radioValue4);
		});

		function handleChange(v) {
			console.log('v :>> ', v);
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
