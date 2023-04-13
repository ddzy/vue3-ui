import { Ref } from 'vue';

export type IUseDebounce = (
	callback: (...args: any[]) => void,
	timestamp?: number
) => (this: ThisType<any>, ...args: any[]) => void;

export type IUsePosition = (options: {
	throttleTime?: number;
	callback?: Function;
}) => {
	clientX: Ref<number>;
	clientY: Ref<number>;
	pageX: Ref<number>;
	pageY: Ref<number>;
};

export type IUseResize = (options: {
	throttleTime?: number;
	callback?: Function;
}) => {};

export type IUseThrottle = (
	callback: (...args: any[]) => void,
	timestamp?: number
) => (this: ThisType<any>, ...args: any[]) => void;
