<template>
	<div class="input-demo-container">
		<div class="demo__inner">
			<h3>【禁用、自定义图标、带边框】</h3>
			<v3-checkbox
				v-model="state.checkboxValue4"
				:defaultIcon="'v3-icon-like'"
				:selectedIcon="'v3-icon-like1'"
				:indeterminatedIcon="'v3-icon-sami-select'"
				>多选1</v3-checkbox
			>
			<v3-checkbox
				v-model="state.checkboxValue5"
				:indeterminate="true"
				:border="true"
				>多选2</v3-checkbox
			>
			<v3-checkbox v-model="state.checkboxValue6" :disabled="true"
				>多选3</v3-checkbox
			>
			<v3-checkbox v-model="state.checkboxValue7" :border="true"
				>多选4</v3-checkbox
			>
		</div>

		<div class="demo__inner">
			<h3>【绑定数字值】：</h3>
			<v3-checkbox-group v-model="state.checkboxValue8" @change="handleChange">
				<v3-checkbox :label="1">多选1</v3-checkbox>
				<v3-checkbox :label="2" :disabled="true">多选2</v3-checkbox>
				<v3-checkbox :label="3">多选3</v3-checkbox>
				<v3-checkbox :label="4">多选4</v3-checkbox>
			</v3-checkbox-group>
		</div>

		<div class="demo__inner">
			<h3>【绑定字符串值】：</h3>
			<v3-checkbox-group v-model="state.checkboxValue9">
				<v3-checkbox :label="'dongguan'">多选1</v3-checkbox>
				<v3-checkbox :label="'gansu'" :disabled="true">多选2</v3-checkbox>
				<v3-checkbox :label="'lanzhou'">多选3</v3-checkbox>
				<v3-checkbox :label="'qingyang'">多选4</v3-checkbox>
			</v3-checkbox-group>
		</div>

		<div class="demo__inner">
			<h3>【绑定布尔值】：</h3>
			<v3-checkbox-group v-model="state.checkboxValue10">
				<v3-checkbox :label="false">多选1</v3-checkbox>
				<v3-checkbox :label="false" :disabled="true">多选2</v3-checkbox>
				<v3-checkbox :label="false">多选3</v3-checkbox>
				<v3-checkbox :label="true">多选4</v3-checkbox>
				<v3-checkbox :label="true" :disabled="true">多选4</v3-checkbox>
			</v3-checkbox-group>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRef, toRefs, watch } from 'vue';
import V3Checkbox from './components/Checkbox.vue';
import V3CheckboxGroup from './components/CheckboxGroup.vue';

export default defineComponent({
	components: {
		V3Checkbox,
		V3CheckboxGroup,
	},
	setup(props, context) {
		const state = reactive({
			checkboxValue4: true,
			checkboxValue5: true,
			checkboxValue6: false,
			checkboxValue7: false,
			checkboxValue8: [2],
			checkboxValue9: [],
			checkboxValue10: [],
		});

		watch(reactive(state), newValue => {
			console.log('state.checkboxValue10 :>> ', newValue);
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
