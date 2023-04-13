// Volar
declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		V3Back: typeof import('@typings/index').V3Back;
		V3Backdrop: typeof import('@typings/index').V3Backdrop;
		V3Badge: typeof import('@typings/index').V3Badge;
		V3BasePopper: typeof import('@typings/index').V3BasePopper;
		V3Button: typeof import('@typings/index').V3Button;
		V3Card: typeof import('@typings/index').V3Card;
		V3Carousel: typeof import('@typings/index').V3Carousel;
		V3Checkbox: typeof import('@typings/index').V3Checkbox;
		V3CheckboxGroup: typeof import('@typings/index').V3CheckboxGroup;
		V3DemoBlock: typeof import('@typings/index').V3DemoBlock;
		V3Dialog: typeof import('@typings/index').V3Dialog;
		V3Divider: typeof import('@typings/index').V3Divider;
		V3Drawer: typeof import('@typings/index').V3Drawer;
		V3Input: typeof import('@typings/index').V3Input;
		V3InputNumber: typeof import('@typings/index').V3InputNumber;
		V3InputTextarea: typeof import('@typings/index').V3InputTextarea;
		V3Loading: typeof import('@typings/index').V3Loading;
		V3Message: typeof import('@typings/index').V3Message;
		V3Popconfirm: typeof import('@typings/index').V3Popconfirm;
		V3Popover: typeof import('@typings/index').V3Popover;
		V3ProgressLinear: typeof import('@typings/index').V3ProgressLinear;
		V3ProgressCircular: typeof import('@typings/index').V3ProgressCircular;
		V3Radio: typeof import('@typings/index').V3Radio;
		V3RadioButton: typeof import('@typings/index').V3RadioButton;
		V3RadioGroup: typeof import('@typings/index').V3RadioGroup;
		V3Row: typeof import('@typings/index').V3Row;
		V3Col: typeof import('@typings/index').V3Col;
		V3Select: typeof import('@typings/index').V3Select;
		V3SelectOption: typeof import('@typings/index').V3SelectOption;
		V3Slider: typeof import('@typings/index').V3Slider;
		V3Space: typeof import('@typings/index').V3Space;
		V3Switch: typeof import('@typings/index').V3Switch;
		V3Tag: typeof import('@typings/index').V3Tag;
		V3Tooltip: typeof import('@typings/index').V3Tooltip;
		useLoading: import('@typings/index').V3LoadingHook;
		useMessage: import('@typings/index').V3MessageHook;
		useThrottle: import('@typings/index').IUseThrottle;
		useDebounce: import('@typings/index').IUseDebounce;
		usePosition: import('@typings/index').IUsePosition;
		useResize: import('@typings/index').IUseResize;
	}

	export interface ComponentCustomProperties {
		$message: import('@typings/index').V3MessageService;
		$loading: import('@typings/index').V3LoadingService;
	}
}

export {};
