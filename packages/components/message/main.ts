import { App } from 'vue';
import Message from './src/components/Message.vue';

const install = function(app: App) {
	app.component(Message.name, Message);
};

export { Message };

export default install;
