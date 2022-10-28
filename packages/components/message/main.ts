import { App } from 'vue';
import Message, { useMessage } from './lib/MessageConstructor';

Message.install = function(app: App) {
	app.config.globalProperties.$message = Message;
};

export default Message;
export { useMessage };
