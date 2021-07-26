import { App } from 'vue';
import Loading, {
	LoadingDirective,
	useLoading,
} from './src/components/LoadingConstructor';

Loading.install = function(app: App) {
	app.config.globalProperties.$loading = Loading;
	app.directive(LoadingDirective.name, LoadingDirective.directive);
};

export { LoadingDirective, useLoading };
export default Loading;
