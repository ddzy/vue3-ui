import { App } from 'vue';
import Loading from './src/components/LoadingConstructor';

Loading.install = function(app: App) {
	app.config.globalProperties.$loading = Loading;
};

export default Loading;
