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
		<div
			class="home__main"
			:style="{
				paddingRight: state.isNavUnfold ? '200px' : '0px',
			}"
		>
			<div ref="contentRef" class="home-main__content">
				<router-view></router-view>
			</div>
			<div
				class="home-main__nav"
				:style="{
					right: state.isNavUnfold ? '0' : '-200px',
				}"
			>
				<div class="home-main-nav__trigger" @click="handleNavTriggerClick">
					<i class="v3-icon v3-icon-arrow-right"></i>
				</div>
				<ul class="home-main-nav__list">
					<li
						v-for="v in state.navList"
						class="home-main-nav__item"
						:key="v.link"
						:class="{
							'is-active': v.isActive,
						}"
						@click="handleNavItemClick(v)"
					>
						<span>{{ v.title }}</span>
					</li>
				</ul>
			</div>
		</div>
		<transition name="unfolder-fade">
			<div
				v-show="!state.isNavUnfold"
				class="home__unfolder"
				@click="handleNavTriggerClick"
			>
				<i class="v3-icon v3-icon-arrow-left"></i>
			</div>
		</transition>
	</div>
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	watch,
	provide,
} from 'vue';
import { useRoute } from 'vue-router';
import { dynamcRoutes } from './router';

interface INavItem {
	link: string;
	title: string;
	isActive: boolean;
}
interface IState {
	navList: INavItem[];
	isNavUnfold: boolean;
	navTransitionTime: string;
}

export default defineComponent({
	name: 'Home',
	setup() {
		const state: IState = reactive({
			navList: [],
			isNavUnfold: true,
			navTransitionTime: '300ms',
		});
		const $route = useRoute();
		const contentRef = ref(document.createElement('div'));

		provide('HOME_STATE', state);

		watch(
			() => $route.path,
			() => {
				nextTick(() => {
					// 每次切换路由时，都要更新导航列表
					const hash = decodeURIComponent(location.hash.replace('#', ''));
					const h3ElementList = contentRef.value.querySelectorAll('h3');

					state.navList = Array.from(h3ElementList).map(v => {
						return {
							link: v.id,
							title: v.id,
							isActive: hash === v.id,
						};
					});
				});
			},
			{ immediate: true }
		);

		onMounted(() => {
			window.addEventListener('hashchange', handleHashChange);
		});

		onBeforeUnmount(() => {
			window.removeEventListener('hashchange', handleHashChange);
		});

		function handleHashChange() {
			// 监听到 hash 变化时，自动更新导航项的高亮状态
			const hash = decodeURIComponent(location.hash.replace('#', ''));
			state.navList = state.navList.map(v => {
				return {
					...v,
					isActive: v.link === hash,
				};
			});
		}

		function handleNavTriggerClick() {
			state.isNavUnfold = !state.isNavUnfold;
		}

		function handleNavItemClick(row: INavItem) {
			location.hash = row.link;
			handleHashChange();
		}

		return {
			state,
			dynamcRoutes,
			contentRef,
			handleNavTriggerClick,
			handleNavItemClick,
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
$nav-transition-time: v-bind('state.navTransitionTime');

.unfolder-fade-enter .unfolder-fade-enter-from {
	opacity: 0;
}
.unfolder-fade-enter-active {
	transition-delay: $nav-transition-time;
}
.unfolder-fade-leave-active {
	transition-delay: 0s;
}
.unfolder-fade-enter-to,
.unfolder-fade-leave-from {
	opacity: 1;
}
.unfolder-fade-leave-to {
	opacity: 0;
}

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
		box-sizing: border-box;
		overflow-x: hidden;
		display: flex;
		max-width: 1300px;
		margin: 0 auto;
		padding: 20px 200px 20px 270px;
		transition: padding-right $nav-transition-time
			cubic-bezier(0.17, 0.84, 0.44, 1);
		.home-main__content {
			flex: 1;
			box-sizing: border-box;
			overflow-x: hidden;
			padding: 0 5px;
		}
		.home-main__nav {
			position: fixed;
			top: 0;
			right: 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 200px;
			padding-top: 40px;
			transition: right $nav-transition-time cubic-bezier(0.17, 0.84, 0.44, 1);
		}

		.home-main-nav__trigger {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background-color: #f2f2f2;
			font-size: 25px;
			color: #666;
			cursor: pointer;
			&:hover {
				background-color: #e5e6e7;
			}
		}
		.home-main-nav__list {
			width: 150px;
			margin-top: 40px;
		}
		.home-main-nav__item {
			padding: 6px 12px;
			cursor: pointer;
			&:hover:not(.is-active) {
				background-color: #f7f7f7;
				color: #666;
			}
			&.is-active {
				background-color: #f2f2f2;
				color: #00a0ff;
			}
		}
	}
	.home__unfolder {
		position: fixed;
		top: 40px;
		right: -10px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border-radius: 18px 0 0 18px;
		background-color: #f2f2f2;
		font-size: 25px;
		color: #666;
		cursor: pointer;
		&:hover {
			background-color: #e5e6e7;
		}
	}
}
</style>
