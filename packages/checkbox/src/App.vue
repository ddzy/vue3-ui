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
			<h3>【多选框组-绑定数字值】：</h3>
			<v3-checkbox-group v-model="state.checkboxValue8" @change="handleChange">
				<v3-checkbox :label="1">多选1</v3-checkbox>
				<v3-checkbox :label="2" :disabled="true">多选2</v3-checkbox>
				<v3-checkbox :label="3">多选3</v3-checkbox>
				<v3-checkbox :label="4">多选4</v3-checkbox>
			</v3-checkbox-group>
		</div>

		<div class="demo__inner">
			<h3>【多选框组-绑定字符串值】：</h3>
			<v3-checkbox-group v-model="state.checkboxValue9">
				<v3-checkbox :label="'dongguan'">多选1</v3-checkbox>
				<v3-checkbox :label="'gansu'" :disabled="true">多选2</v3-checkbox>
				<v3-checkbox :label="'lanzhou'">多选3</v3-checkbox>
				<v3-checkbox :label="'qingyang'">多选4</v3-checkbox>
			</v3-checkbox-group>
		</div>

		<div class="demo__inner">
			<h3>【多选框组-绑定布尔值】：</h3>
			<v3-checkbox-group v-model="state.checkboxValue10">
				<v3-checkbox :label="false">多选1</v3-checkbox>
				<v3-checkbox :label="false" :disabled="true">多选2</v3-checkbox>
				<v3-checkbox :label="false">多选3</v3-checkbox>
				<v3-checkbox :label="true">多选4</v3-checkbox>
				<v3-checkbox :label="true" :disabled="true">多选4</v3-checkbox>
			</v3-checkbox-group>
		</div>

		<div class="demo__inner">
			<h3>【多选框组 + indeterminate 状态】：</h3>
			<v3-checkbox
				v-model="state.checkboxValue11"
				:indeterminate="state.checkboxIndeterminate11"
				@change="handleCheckbox11Change"
				>全选</v3-checkbox
			>
			<v3-checkbox-group
				v-model="state.checkboxValue10"
				@change="handleCheckbox10Change"
			>
				<v3-checkbox
					v-for="v in state.checkboxOriginValue10"
					:key="v._id"
					:label="v._id"
					:disabled="v.disabled"
					>{{ v.name }}</v3-checkbox
				>
			</v3-checkbox-group>
		</div>

		<div class="demo__inner">
			<h3>【多选框组 + 限制最大/最小选择数量】：</h3>
			<v3-checkbox-group v-model="state.checkboxValue12" :max="4" :min="2">
				<v3-checkbox
					v-for="v in state.checkboxOriginValue12"
					:key="v._id"
					:label="v._id"
					:disabled="v.disabled"
					>{{ v.name }}</v3-checkbox
				>
			</v3-checkbox-group>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
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
			checkboxOriginValue10: [
				{
					_id: 'banana',
					name: '多选项1',
					disabled: false,
				},
				{
					_id: 'apple',
					name: '多选项2',
					disabled: false,
				},
				{
					_id: 'orange',
					name: '多选项3',
					disabled: false,
				},
				{
					_id: 'grape',
					name: '多选项4',
					disabled: false,
				},
			],
			checkboxValue11: false,
			checkboxIndeterminate11: false,
			checkboxValue12: ['banana', 'orange'],
			checkboxOriginValue12: [
				{
					_id: 'banana',
					name: '多选项1',
					disabled: false,
				},
				{
					_id: 'apple',
					name: '多选项2',
					disabled: false,
				},
				{
					_id: 'orange',
					name: '多选项3',
					disabled: true,
				},
				{
					_id: 'grape',
					name: '多选项4',
					disabled: false,
				},
				{
					_id: 'watermelon',
					name: '多选项5',
					disabled: false,
				},
				{
					_id: 'peach',
					name: '多选项6',
					disabled: false,
				},
			],
		});

		watch(reactive(state), newValue => {
			console.log('newState :>> ', newValue);
		});

		return {
			state,
		};
	},
	methods: {
		handleChange(v) {
			void 0;
		},
		handleCheckbox10Change(v) {
			this.state.checkboxIndeterminate11 =
				v.length > 0 && v.length < this.state.checkboxOriginValue10.length;
			this.state.checkboxValue11 =
				v.length === this.state.checkboxOriginValue10.length;
		},
		handleCheckbox11Change(v) {
			// 全选 or 全不选
			if (v) {
				this.state.checkboxValue10 = this.state.checkboxOriginValue10.map(
					innerV => {
						return innerV._id;
					}
				);
				this.state.checkboxValue11 = true;
			} else {
				this.state.checkboxValue10 = [];
				this.state.checkboxValue11 = false;
			}
			this.state.checkboxIndeterminate11 = false;
		},
	},
});
</script>
<style lang="scss" scoped>
.demo__inner {
	min-width: 200px;
	margin-top: 20px;
}
</style>
