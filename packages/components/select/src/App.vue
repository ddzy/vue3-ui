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
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const state = reactive({
			selectValue1: '上海',
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
		});

		return {
			state,
		};
	},
	methods: {},
});
</script>
<style lang="scss" scoped></style>
