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

		<v3-row>
			<v3-col>
				<h3>禁用下拉框：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="2">
				<v3-select
					v-model="state.selectValue4"
					value-key="_id"
					:disabled="true"
				>
					<v3-select-option
						v-for="v in state.selectOptions4"
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
				<h3>可清空所选值：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="2">
				<v3-select
					v-model="state.selectValue5"
					:clearable="true"
					@change="handleChange"
				>
					<v3-select-option
						v-for="v in state.selectOptions5"
						:key="v.value"
						:value="v.value"
						:label="v.label"
					></v3-select-option>
				</v3-select>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>可过滤选项：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="2">
				<v3-select
					v-model="state.selectValue6"
					:clearable="true"
					:noDataText="'暂时没有数据'"
					:filterable="true"
					:filterMethod="filterMethod6"
					@clear="handleClear6"
					@visible="handleVisible6"
				>
					<v3-select-option
						v-for="v in state.selectOptions6"
						:key="v.value"
						:value="v.value"
						:label="v.label"
					></v3-select-option>
				</v3-select>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>可开启远程搜索：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col :span="2">
				<v3-select
					v-model="state.selectValue7"
					:clearable="true"
					:noDataText="'暂时没有数据'"
					:filterable="true"
					:remote="true"
					:remoteMethod="remoteMethod7"
					@clear="handleClear7"
					@visible="handleVisible7"
				>
					<v3-select-option
						v-for="v in state.selectOptions7"
						:key="v.value"
						:value="v.value"
						:label="v.label"
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

			selectValue4: '',
			selectOptions4: [
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

			selectValue5: 'Beijing',
			selectOptions5: [
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

			selectValue6: '',
			selectOptions6: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: false,
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
			selectOptions6Copy: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: false,
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

			selectValue7: '',
			selectOptions7: [],
			selectOptions7Copy: [
				{
					label: '北京',
					value: 'Beijing',
					disabled: false,
				},
				{
					label: '北京1',
					value: 'Beijing1',
					disabled: false,
				},
				{
					label: '北京2',
					value: 'Beijing2',
					disabled: false,
				},
				{
					label: '北京3',
					value: 'Beijing3',
					disabled: false,
				},
				{
					label: '上海',
					value: 'Shanghai',
					disabled: false,
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

		/**
		 * 自定义过滤方法
		 */
		function filterMethod6(keyword: string) {
			if (!keyword) {
				state.selectOptions6 = state.selectOptions6Copy.slice();
			} else {
				state.selectOptions6 = state.selectOptions6Copy.filter(v => {
					return v.label.includes(keyword);
				});
			}
		}

		function handleClear6() {
			state.selectOptions6 = state.selectOptions6Copy.slice();
		}

		function handleVisible6(visible: boolean) {
			if (!visible) {
				state.selectOptions6 = state.selectOptions6Copy.slice();
			}
		}

		/**
		 * 自定义远程搜索方法
		 */
		async function remoteMethod7(keyword: string) {
			if (!keyword) {
				state.selectOptions7 = [];
				return;
			}

			const result = state.selectOptions7Copy.filter(v => {
				return v.label.includes(keyword);
			});

			setTimeout(() => {
				(state.selectOptions7 as typeof state.selectOptions7Copy) = result;
			}, 1000);
		}

		function handleClear7() {
			(state.selectOptions7 as typeof state.selectOptions7Copy) = state.selectOptions7Copy.slice();
		}

		function handleVisible7(visible: boolean) {
			if (!visible) {
				state.selectOptions7 = [];
			}
		}

		return {
			state,
			filterMethod6,
			handleClear6,
			handleVisible6,
			remoteMethod7,
			handleClear7,
			handleVisible7,
		};
	},
	methods: {
		handleChange(v: any) {
			console.log('v :>> ', v);
		},
	},
});
</script>
<style lang="scss" scoped></style>
