import { App } from 'vue';

import './icon/assets/fonts/iconfont.css';
import ButtonInstallation, { Button } from './button/main';
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

export {
	ButtonInstallation,
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
};

export default function install(app: App) {
	app.component(Button.name, Button);
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
}
