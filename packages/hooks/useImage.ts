import { ref, type Ref } from 'vue';

type IUseImage = (options: IUseImageOptions) => IUseImageReturn;
interface IUseImageOptions {
	/** 图片链接 */
	src: string;
	/** 图片加载失败时的回调 */
	onFailed?: (e: Event) => void;
}
type IUseImageReturn = {
	/** 图片是否正在加载 */
	isLoading: Ref<boolean>;
	/** 图片是否加载失败 */
	isFailed: Ref<boolean>;
	data: Ref<Event | undefined>;
};

/**
 * 加载图片
 */
const useImage: IUseImage = (options) => {
	const defaultOptions: typeof options = {
		...options,
	};
	const isLoading = ref(false);
	const isFailed = ref(false);
	const data = ref<Event>();

	const img = new Image();
	img.src = defaultOptions.src;
	// 开始加载
	isLoading.value = true;

	img.addEventListener('load', (e) => {
		// 加载完成
		isLoading.value = false;
		data.value = e;
	});
	img.addEventListener('error', (e) => {
		// 加载失败
		isFailed.value = true;
		isLoading.value = false;

		if (defaultOptions.onFailed) {
			defaultOptions.onFailed(e);
		}
	});

	return {
		isLoading,
		isFailed,
		data,
	};
};

export default useImage;
