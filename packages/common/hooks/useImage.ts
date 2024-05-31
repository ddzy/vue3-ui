import { ref, type Ref } from 'vue';

type IUseImage = (options: { src: string; onFailed?: (e: Event) => void }) => {
	isLoading: Ref<boolean>;
	isFailed: Ref<boolean>;
	data: Ref<Event | undefined>;
};

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
