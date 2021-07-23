// @ts-nocheck

import * as TYPES from '@/public/types/loading';
import {
	ComponentInternalInstance,
	ComponentPublicInstance,
	createVNode,
	reactive,
	render,
} from 'vue';
import Loading from './Loading.vue';

const LoadingConstructor: TYPES.ILoadingConstructor = (
	options: TYPES.ILoadingProps
) => {
	return Loading;
};

export default LoadingConstructor;
