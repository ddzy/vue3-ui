<template>
	<div class="demo-container">
		<v3-row>
			<v3-col>
				<h3>基本用法（绑定字符串值）：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="2">
				<v3-select v-model="state.selectValue1">
					<v3-select-option
						v-for="v in state.selectOptions1"
						:key="v.value"
						:value="v.value"
						:label="v.label"
						:disabled="v.disabled"
					></v3-select-option>
				</v3-select>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>基本用法（绑定数字值）：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="2">
				<v3-select v-model="state.selectValue2">
					<v3-select-option
						v-for="v in state.selectOptions2"
						:key="v.value"
						:value="v.value"
						:label="v.label"
						:disabled="v.disabled"
					></v3-select-option>
				</v3-select>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>基本用法（绑定对象值，需指定【value-key】属性）：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="2">
				<v3-select v-model="state.selectValue3" value-key="_id">
					<v3-select-option
						v-for="v in state.selectOptions3"
						:key="v.value"
						:value="v.value"
						:label="v.label"
						:disabled="v.disabled"
					></v3-select-option>
				</v3-select>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			selectValue1: 'Beijing',
			selectOptions1: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: true,
				},
				{
					label: '广州',
					value: 'Guangzhou',
					disabled: false,
				},
				{
					label: '深圳',
					value: 'Shenzhen',
					disabled: false,
				},
			],

			selectValue2: 1,
			selectOptions2: [
				{
					label: '1',
					value: 1,
					disabled: false,
				},
				{
					label: '2',
					value: 2,
					disabled: true,
				},
				{
					label: '3',
					value: 3,
					disabled: true,
				},
				{
					label: '4',
					value: 4,
					disabled: true,
				},
			],

			selectValue3: '',
			selectOptions3: [
				{
					label: '对象1',
					value: {
						_id: 1,
						name: 1,
						age: 1,
					},
					disabled: false,
				},
				{
					label: '对象2',
					value: {
						_id: 2,
						name: 2,
						age: 2,
					},
					disabled: false,
				},
				{
					label: '对象3',
					value: {
						_id: 3,
						name: 3,
						age: 3,
					},
					disabled: false,
				},
				{
					label: '对象4',
					value: {
						_id: 4,
						name: 4,
						age: 4,
					},
					disabled: false,
				},
			],
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
