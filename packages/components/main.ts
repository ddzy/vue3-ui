import { App, createApp } from 'vue';
import 'vite-plugin-vuedoc/style.css';

import * as TYPES_MESSAGE from '@/public/types/message';
import * as TYPES_LOADING from '@/public/types/loading';
import './icon/assets/fonts/iconfont.css';
import V3Button from './button/main';
import V3ButtonGroup from './button-group/main';
import V3Checkbox from './checkbox/main';
import V3CheckboxButton from './checkbox-button/main';
import V3CheckboxGroup from './checkbox-group/main';
import V3Input from './input/main';
import V3InputNumber from './input-number/main';
import V3InputTextarea from './input-textarea/main';
import V3Radio from './radio/main';
import V3RadioButton from './radio-button/main';
import V3RadioGroup from './radio-group/main';
import V3DemoBlock from './demo-block/main';
import V3Row from './row/main';
import V3Col from './col/main';
import V3Message from './message/main';
import V3Select from './select/main';
import V3SelectOption from './select-option/main';
import V3Tag from './tag/main';
import V3Backdrop from './backdrop/main';
import V3Dialog from './dialog/main';
import V3Switch from './switch/main';
import V3Tooltip from './tooltip/main';
import V3Popover from './popover/main';
import V3Divider from './divider/main';
import V3Space from './space/main';
import V3Badge from './badge/main';
import V3Loading, {
	LoadingDirective as V3LoadingDirective,
	useLoading,
} from './loading/main';
import V3Card from './card/main';
import V3BasePopper from './base-popper/main';
import V3Popconfirm from './popconfirm/main';
import V3Slider from './slider/main';
import V3ProgressLinear from './progress-linear/main';
import V3ProgressCircular from './progress-circular/main';
import V3Carousel from './carousel/main';
import V3CarouselItem from './carousel-item/main';
import V3Drawer from './drawer/main';
import V3Back from './back/main';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$message: TYPES_MESSAGE.IMessageConstructor;
		$loading: TYPES_LOADING.ILoadingConstructor;
	}
}

// test
import Demo from './main.vue';
import { RouteRecordRaw } from 'vue-router';

if (process.env.BUILD_TARGET === 'docs') {
	import('./router').then((router: any) => {
		router.beforeEach((to: RouteRecordRaw) => {
			if (to.meta && to.meta.title) {
				document.title = `vue3-ui--${to.meta.title}`;
			}
		});

		const app = createApp(Demo);
		app.use(install);
		app.use(router);
		app.mount('#app');
	});
}

export {
	V3Button,
	V3ButtonGroup,
	V3Checkbox,
	V3CheckboxButton,
	V3CheckboxGroup,
	V3Input,
	V3InputNumber,
	V3InputTextarea,
	V3Radio,
	V3RadioButton,
	V3RadioGroup,
	V3DemoBlock,
	V3Row,
	V3Col,
	V3Message,
	V3Select,
	V3SelectOption,
	V3Tag,
	V3Backdrop,
	V3Dialog,
	V3Switch,
	V3Tooltip,
	V3Popover,
	V3Divider,
	V3Space,
	V3Badge,
	V3Loading,
	useLoading,
	V3Card,
	V3BasePopper,
	V3Popconfirm,
	V3Slider,
	V3ProgressLinear,
	V3ProgressCircular,
	V3Carousel,
	V3CarouselItem,
	V3Drawer,
	V3Back,
};

export default function install(app: App) {
	app.component(V3Button.name, V3Button);
	app.component(V3ButtonGroup.name, V3ButtonGroup);
	app.component(V3Checkbox.name, V3Checkbox);
	app.component(V3CheckboxButton.name, V3CheckboxButton);
	app.component(V3CheckboxGroup.name, V3CheckboxGroup);
	app.component(V3Input.name, V3Input);
	app.component(V3InputNumber.name, V3InputNumber);
	app.component(V3InputTextarea.name, V3InputTextarea);
	app.component(V3Radio.name, V3Radio);
	app.component(V3RadioButton.name, V3RadioButton);
	app.component(V3RadioGroup.name, V3RadioGroup);
	app.component(V3DemoBlock.name, V3DemoBlock);
	app.component(V3Row.name, V3Row);
	app.component(V3Col.name, V3Col);
	app.component(V3Select.name, V3Select);
	app.component(V3SelectOption.name, V3SelectOption);
	app.component(V3Tag.name, V3Tag);
	app.component(V3Backdrop.name, V3Backdrop);
	app.component(V3Dialog.name, V3Dialog);
	app.component(V3Switch.name, V3Switch);
	app.component(V3Tooltip.name, V3Tooltip);
	app.component(V3Popover.name, V3Popover);
	app.component(V3Divider.name, V3Divider);
	app.component(V3Space.name, V3Space);
	app.component(V3Badge.name, V3Badge);
	app.component(V3Card.name, V3Card);
	app.component(V3BasePopper.name, V3BasePopper);
	app.component(V3Popconfirm.name, V3Popconfirm);
	app.component(V3Slider.name, V3Slider);
	app.component(V3ProgressLinear.name, V3ProgressLinear);
	app.component(V3ProgressCircular.name, V3ProgressCircular);
	app.component(V3Carousel.name, V3Carousel);
	app.component(V3CarouselItem.name, V3CarouselItem);
	app.component(V3Drawer.name, V3Drawer);
	app.component(V3Back.name, V3Back);
	app.config.globalProperties.$message = V3Message;
	app.config.globalProperties.$loading = V3Loading;
	app.directive(V3LoadingDirective.name, V3LoadingDirective.directive);
}
