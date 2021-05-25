import { App, createApp } from 'vue';

import * as TYEPS_MESSAGE from '@/public/types/message';
import './icon/assets/fonts/iconfont.css';
import V3Button from './button/main';
import ButtonGroupInstallation, { ButtonGroup } from './button-group/main';
import CheckboxInstallation, { Checkbox } from './checkbox/main';
import CheckboxButtonInstallation, {
	CheckboxButton,
} from './checkbox-button/main';
import CheckboxGroupInstallation, {
	CheckboxGroup,
} from './checkbox-group/main';
import InputInstallation, { Input } from './input/main';
import InputNumberInstallation, { InputNumber } from './input-number/main';
import InputTextareaInstallation, {
	InputTextarea,
} from './input-textarea/main';
import RadioInstallation, { Radio } from './radio/main';
import RadioButtonInstallation, { RadioButton } from './radio-button/main';
import RadioGroupInstallation, { RadioGroup } from './radio-group/main';
import DemoBlockInstallation, { DemoBlock } from './demo-block/main';
import RowInstallation, { Row } from './row/main';
import ColInstallation, { Col } from './col/main';
import V3Message from './message/main';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$message: TYEPS_MESSAGE.IMessageConstructor;
	}
}

// test
import Demo from './message/src/App.vue';
const app = createApp(Demo);
app.use(install);
app.mount('#app');

export {
	V3Button,
	ButtonGroupInstallation,
	CheckboxInstallation,
	CheckboxButtonInstallation,
	CheckboxGroupInstallation,
	InputInstallation,
	InputNumberInstallation,
	InputTextareaInstallation,
	RadioInstallation,
	RadioButtonInstallation,
	RadioGroupInstallation,
	DemoBlockInstallation,
	RowInstallation,
	ColInstallation,
	V3Message,
};

export default function install(app: App) {
	app.component(V3Button.name, V3Button);
	app.component(ButtonGroup.name, ButtonGroup);
	app.component(Checkbox.name, Checkbox);
	app.component(CheckboxButton.name, CheckboxButton);
	app.component(CheckboxGroup.name, CheckboxGroup);
	app.component(Input.name, Input);
	app.component(InputNumber.name, InputNumber);
	app.component(InputTextarea.name, InputTextarea);
	app.component(Radio.name, Radio);
	app.component(RadioButton.name, RadioButton);
	app.component(RadioGroup.name, RadioGroup);
	app.component(DemoBlock.name, DemoBlock);
	app.component(Row.name, Row);
	app.component(Col.name, Col);
	app.config.globalProperties.$message = V3Message;
}
