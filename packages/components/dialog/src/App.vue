<template>
	<div class="demo-container">
		<v3-row>
			<v3-col>
				<h3>基本用法：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="state.showDialog1 = true"
					>打开弹窗</v3-button
				>
				<v3-dialog
					v-model="state.showDialog1"
					:title="'基本用法'"
					:headerActions="state.headerActions1"
				>
					<div class="dialog-content-1">
						天下之患，最不可为者，名为治平无事，而其实有不测之忧，坐观其变，而不为之所，则恐至于不可救，起而强为之则天下狃于治平之安，而不吾信
						——《苏东坡 晁错论》
						大汉开国元勋淮阴侯韩信死于长乐钟室，年仅三十五岁。随后，韩信三族被诛，数千无辜，血染长安，哭号之声，传荡千古，当是时，寒风凛冽，长空飘雪，长安满城人尽嗟叹，无不悲怆，皆言淮阴侯一饭千金，不忘漂母；解衣推食，宁负汉皇？萧何一言便强入贺，欲谋逆者怎会坦率如斯？是侯不负汉，而汉忍于负侯，侯之死，冤乎哉！
						不日，蒯通被带到，高祖亲自审问。「当日汝与韩信之言，究竟为何？」
						蒯通道「吾相韩信，言其面不过封侯，背则贵不可言。因说之背汉自立，则可三分天下也。」
						高祖又问：「然信有何言？」 蒯通长叹一声道：
					</div>
				</v3-dialog>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>可自定义头部的操作按钮组：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="state.showDialog2 = true"
					>打开弹窗</v3-button
				>
				<v3-dialog
					v-model="state.showDialog2"
					:headerActions="state.headerActions2"
				>
					<div class="dialog-content-2">
						<h4 style="margin: 0; margin-bottom: 12px">姓名：</h4>
						<v3-input></v3-input>
						<h4 style="margin: 20px 0;">性别：</h4>
						<v3-radio-group v-model="state.radioValue2">
							<v3-radio label="male">男</v3-radio>
							<v3-radio label="female">女</v3-radio>
						</v3-radio-group>
						<h4 style="margin: 20px 0;">工作地：</h4>
						<v3-select v-model="state.selectValue2">
							<v3-select-option
								v-for="v in state.selectOptions2"
								:key="v.value"
								:value="v.value"
								:label="v.label"
								:disabled="v.disabled"
							></v3-select-option>
						</v3-select>
					</div>
				</v3-dialog>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>可自定义弹窗标题：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="state.showDialog3 = true"
					>打开弹窗</v3-button
				>
				<v3-dialog v-model="state.showDialog3">
					<template #title>
						<span style="color: rgba(237, 170, 83, 1)">slot 自定义标题</span>
					</template>
					<div class="dialog-content-3">
						天下之患，最不可为者，名为治平无事，而其实有不测之忧，坐观其变，而不为之所，则恐至于不可救，起而强为之则天下狃于治平之安，而不吾信
						——《苏东坡 晁错论》
						大汉开国元勋淮阴侯韩信死于长乐钟室，年仅三十五岁。随后，韩信三族被诛，数千无辜，血染长安，哭号之声，传荡千古，当是时，寒风凛冽，长空飘雪，长安满城人尽嗟叹，无不悲怆，皆言淮阴侯一饭千金，不忘漂母；解衣推食，宁负汉皇？萧何一言便强入贺，欲谋逆者怎会坦率如斯？是侯不负汉，而汉忍于负侯，侯之死，冤乎哉！
						不日，蒯通被带到，高祖亲自审问。「当日汝与韩信之言，究竟为何？」
						蒯通道「吾相韩信，言其面不过封侯，背则贵不可言。因说之背汉自立，则可三分天下也。」
						高祖又问：「然信有何言？」 蒯通长叹一声道：
					</div>
				</v3-dialog>
			</v3-col>
		</v3-row>

		<v3-row>
			<v3-col>
				<h3>弹窗内容和底部均可自定义：</h3>
			</v3-col>
		</v3-row>
		<v3-row>
			<v3-col>
				<v3-button type="primary" @click="state.showDialog4 = true"
					>打开弹窗</v3-button
				>
				<v3-dialog
					title="提示"
					width="25%"
					v-model="state.showDialog4"
					:closeOnClickBackdrop="false"
				>
					<div class="dialog-content-4">
						<i class="v3-icon v3-icon-warning-fill"></i>
						<span> 确定要删除吗？ </span>
					</div>
					<template #footer>
						<div class="dialog-footer-4">
							<v3-button type="default" plain @click="state.showDialog4 = false"
								>取消</v3-button
							>
							<v3-button type="primary" @click="handleConfirm4"
								>我知道了</v3-button
							>
						</div>
					</template>
				</v3-dialog>
			</v3-col>
		</v3-row>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import V3Message from '@components/message/src/components/MessageConstructor';

export default defineComponent({
	setup() {
		const state = reactive({
			showDialog1: false,
			showDialog2: false,
			radioValue2: 'male',
			selectValue2: 'beijing',
			selectOptions2: [
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
			showDialog3: false,
			showDialog4: false,
			headerActions2: [
				{
					buttonProps: {
						type: 'default',
						loading: false,
						plain: true,
					},
					text: '取消',
					handler() {
						state.showDialog2 = false;
					},
				},
				{
					buttonProps: {
						type: 'success',
						loading: false,
					},
					text: '确定',
					handler() {
						state.headerActions2[1].buttonProps.loading = true;

						setTimeout(() => {
							state.headerActions2[1].buttonProps.loading = false;
						}, 1000);
					},
				},
			],
		});

		function handleConfirm4() {
			V3Message.success({
				message: '已确认',
			});

			state.showDialog4 = false;
		}

		return {
			state,
			handleConfirm4,
		};
	},
	methods: {},
});
</script>
<style lang="scss">
body {
	height: 1200px;
}
</style>
<style lang="scss" scoped>
.dialog-content-4 {
	display: flex;
	align-items: center;
	i.v3-icon {
		font-size: 20px;
		color: rgba(237, 170, 83, 1);
	}
	span {
		display: block;
		margin-left: 6px;
	}
}
.dialog-footer-4 {
	display: flex;
	justify-content: flex-end;
	:deep(.v3-button) {
		&:not(:first-child) {
			margin-left: 12px;
		}
	}
}
</style>
