<template>
	<div class="demo-container">
		<v3-row>
			<v3-col :span="12">
				<h3>带边框的单选框：</h3>
			</v3-col>
			<v3-col>
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
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="12">
				<h3>单选框组：</h3>
			</v3-col>
			<v3-col>
				<v3-radio-group v-model="state.radioValue2" @change="handleChange">
					<v3-radio :label="1">单选1</v3-radio>
					<v3-radio :label="2">单选2</v3-radio>
					<v3-radio :label="3">单选3</v3-radio>
					<v3-radio :label="4">单选4</v3-radio>
				</v3-radio-group>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="12">
				<h3>按钮形式的单选框组：</h3>
			</v3-col>
			<v3-col>
				<v3-radio-group v-model="state.radioValue3" @change="handleChange">
					<v3-radio-button :label="1" :disabled="true">单选1</v3-radio-button>
					<v3-radio-button :label="2">单选2</v3-radio-button>
					<v3-radio-button :label="3">单选3</v3-radio-button>
					<v3-radio-button :label="4">单选4</v3-radio-button>
				</v3-radio-group>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Radio from './components/Radio.vue';
import V3RadioGroup from './components/RadioGroup.vue';
import V3RadioButton from './components/RadioButton.vue';

export default defineComponent({
	components: {
		V3Radio,
		V3RadioGroup,
		V3RadioButton,
	},
	setup(props, context) {
		const state = reactive({
			inputValue: '测试值123456789',
			radioValue: 3,
			radioValue2: 2,
			radioValue3: 1,
		});

		function handleChange(v: MouseEvent) {
			console.log('v :>> ', v);
		}

		return {
			state,
			handleChange,
		};
	},
});
</script>
<style lang="scss" scoped></style>
