import { ref, type Ref } from 'vue';

type IUseImage = (options: { src: string; onFailed?: (e: Event) => void }) => {
	isLoading: Ref<boolean>;
	isFailed: Ref<boolean>;
};

const useImage: IUseImage = (options) => {
	const defaultOptions: typeof options = {
		...options,
	};
	const isLoading = ref(false);
	const isFailed = ref(false);

	const img = document.createElement('img');
	img.src = defaultOptions.src;
	isLoading.value = true;
	img.addEventListener('load', (e) => {
		isLoading.value = false;
		if (defaultOptions.onFailed) {
			defaultOptions.onFailed(e);
		}
	});
	img.addEventListener('error', () => {
		isFailed.value = true;
		isLoading.value = false;
	});

	return {
		isLoading,
		isFailed,
	};
};

export default useImage;
