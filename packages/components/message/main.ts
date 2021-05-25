import { App } from 'vue';
import Message from './src/components/MessageConstructor';

Message.install = function(app: App) {
	app.config.globalProperties.$message = Message;
};

export default Message;
