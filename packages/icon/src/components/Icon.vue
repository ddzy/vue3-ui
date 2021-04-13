<template>
	<div class="icon-container">
		<ul class="icon__list">
			<li class="icon__item" v-for="v in iconList" :key="v._id">
				<div class="icon-title__wrapper">
					<i
						:class="{
							icon__title: true,
							'v3-icon': true,
							[v._id]: true,
						}"
					></i>
				</div>
				<div class="icon-content__wrapper">
					<span class="icon__content">{{ v.name }}</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	setup() {
		const iconList: Array<{
			_id: string;
			name: string;
		}> = reactive([
			{
				_id: 'v3-icon-viewlarger',
				name: 'v3-icon-viewlarger',
			},
			{
				_id: 'v3-icon-search',
				name: 'v3-icon-search',
			},
			{
				_id: 'v3-icon-editor',
				name: 'v3-icon-editor',
			},
			{
				_id: 'v3-icon-gift',
				name: 'v3-icon-gift',
			},
			{
				_id: 'v3-icon-integral',
				name: 'v3-icon-integral',
			},
			{
				_id: 'v3-icon-nav-list',
				name: 'v3-icon-nav-list',
			},
			{
				_id: 'v3-icon-pic',
				name: 'v3-icon-pic',
			},
			{
				_id: 'v3-icon-Notvisible',
				name: 'v3-icon-Notvisible',
			},
			{
				_id: 'v3-icon-play',
				name: 'v3-icon-play',
			},
			{
				_id: 'v3-icon-rising',
				name: 'v3-icon-rising',
			},
			{
				_id: 'v3-icon-QRcode',
				name: 'v3-icon-QRcode',
			},
			{
				_id: 'v3-icon-rmb',
				name: 'v3-icon-rmb',
			},
			{
				_id: 'v3-icon-similar-product',
				name: 'v3-icon-similar-product',
			},
			{
				_id: 'v3-icon-Exportservices',
				name: 'v3-icon-Exportservices',
			},
			{
				_id: 'v3-icon-sendinquiry',
				name: 'v3-icon-sendinquiry',
			},
			{
				_id: 'v3-icon-add-account',
				name: 'v3-icon-add-account',
			},
			{
				_id: 'v3-icon-add',
				name: 'v3-icon-add',
			},
			{
				_id: 'v3-icon-add-cart',
				name: 'v3-icon-add-cart',
			},
			{
				_id: 'v3-icon-arrow-right',
				name: 'v3-icon-arrow-right',
			},
			{
				_id: 'v3-icon-arrow-left',
				name: 'v3-icon-arrow-left',
			},
			{
				_id: 'v3-icon-arrow-up',
				name: 'v3-icon-arrow-up',
			},
			{
				_id: 'v3-icon-ashbin',
				name: 'v3-icon-ashbin',
			},
			{
				_id: 'v3-icon-atm',
				name: 'v3-icon-atm',
			},
			{
				_id: 'v3-icon-bad',
				name: 'v3-icon-bad',
			},
		]);

		return {
			iconList,
		};
	},
});
</script>

<style lang="scss" scoped>
ul {
	list-style-type: none;
}
li {
	margin: 0;
	padding: 0;
}
.icon-container {
	.icon__list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		width: 800px;
	}
	.icon__item {
		text-align: center;
		.icon-title__wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 12px;
			.icon__title {
				font-size: 25px;
			}
		}
		.icon-content__wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px;
			.icon__content {
			}
		}
	}
}
</style>
