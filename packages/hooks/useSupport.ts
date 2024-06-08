import { ref, type Ref } from 'vue';

type IUseSupport = (callback: () => boolean) => IUseSupportReturn;
type IUseSupportReturn = Ref<boolean>;

/**
 * 自行传入回调，判断某些 API 是否被支持，该 hooks 返回最终结果
 */
const useSupport: IUseSupport = (callback) => {
	const isSupport = ref(false);
	try {
		isSupport.value = callback();
	} catch (error) {
		isSupport.value = false;
	}

	return isSupport;
};

export default useSupport;
