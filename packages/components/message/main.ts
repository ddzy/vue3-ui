import { App } from 'vue';
import Message from './src/components/MessageConstructor';

const install = function(app: App) {
	app.config.globalProperties.$message = Message;
};

export { Message };

export default install;
