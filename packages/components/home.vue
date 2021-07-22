<template>
	<div class="home-container">
		<div class="home__sidebar">
			<ul class="sidebar__list">
				<li class="sidebar__item" v-for="v in dynamcRoutes" :key="v.path">
					<router-link :to="v.path">
						<span>{{ v.name.replace('V3', '') }}</span>
						<span>
							{{ v.meta.title }}
						</span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="home__main">
			<router-view></router-view>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { dynamcRoutes } from './router';

export default defineComponent({
	name: 'Home',
	setup() {
		return {
			dynamcRoutes,
		};
	},
});
</script>
<style lang="scss">
.link--active {
	color: $primary-color;
}
</style>
<style lang="scss" scoped>
.home-container {
	display: flex;
	.home__sidebar {
		overflow-x: hidden;
		overflow-y: auto;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 250px;
		padding: 20px 0;
		background-color: #f3f4f5;
		.sidebar__list {
			width: 100%;
		}
		.sidebar__item {
			box-sizing: border-box;
			text-align: left;
			line-height: 45px;
			a {
				display: block;
				width: 100%;
				height: 100%;
				&:link,
				&:visited {
					color: $font-color-default;
					text-decoration: none;
				}
				&.router-link-active {
					color: $primary-color;
					background-color: $primary-color-plain;
					border-left: 2px solid $primary-color;
				}
				span:first-child {
					padding-left: 30px;
				}
				span:not(:first-child) {
					padding-left: 3px;
				}
			}
		}
	}
	.home__main {
		flex: 1;
		margin-left: 250px;
		padding: 20px;
	}
}
</style>
