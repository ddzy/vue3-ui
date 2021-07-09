import { App, createApp } from 'vue';

import * as TYEPS_MESSAGE from '@/public/types/message';
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

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$message: TYEPS_MESSAGE.IMessageConstructor;
	}
}

// test
import Demo from './switch/src/App.vue';
const app = createApp(Demo);
app.use(install);
app.mount('#app');

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
	app.config.globalProperties.$message = V3Message;
}
