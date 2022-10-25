import { App } from 'vue';
import Message from './lib/MessageConstructor';

Message.install = function(app: App) {
	app.config.globalProperties.$message = Message;
};

export default Message;
