import { getCurrentInstance, onMounted, ref, type Ref } from 'vue';

type IUseMounted = (options?: IUseMountedOptions) => IUseMountedReturn;
interface IUseMountedOptions {}
type IUseMountedReturn = Ref<boolean>;

/**
 * 监听组件是否挂载
 * @returns
 */
const useMounted: IUseMounted = () => {
	const isMounted = ref(false);
	const app = getCurrentInstance();
	if (app) {
		onMounted(() => {
			isMounted.value = true;
		});
	}

	return isMounted;
};

export default useMounted;
