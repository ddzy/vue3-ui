// Volar
declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		V3Back: typeof import('../components/component').V3Back;
		V3Backdrop: typeof import('../components/component').V3Backdrop;
		V3Badge: typeof import('../components/component').V3Badge;
		V3BasePopper: typeof import('../components/component').V3BasePopper;
		V3Button: typeof import('../components/component').V3Button;
		V3Card: typeof import('../components/component').V3Card;
		V3Carousel: typeof import('../components/component').V3Carousel;
		V3Checkbox: typeof import('../components/component').V3Checkbox;
		V3CheckboxGroup: typeof import('../components/component').V3CheckboxGroup;
		V3DemoBlock: typeof import('../components/component').V3DemoBlock;
		V3Dialog: typeof import('../components/component').V3Dialog;
		V3Divider: typeof import('../components/component').V3Divider;
		V3Drawer: typeof import('../components/component').V3Drawer;
		V3Input: typeof import('../components/component').V3Input;
		V3InputNumber: typeof import('../components/component').V3InputNumber;
		V3InputTextarea: typeof import('../components/component').V3InputTextarea;
		V3Loading: typeof import('../components/component').V3Loading;
		V3Message: typeof import('../components/component').V3Message;
		V3Popconfirm: typeof import('../components/component').V3Popconfirm;
		V3Popover: typeof import('../components/component').V3Popover;
		V3ProgressLinear: typeof import('../components/component').V3ProgressLinear;
		V3ProgressCircular: typeof import('../components/component').V3ProgressCircular;
		V3Radio: typeof import('../components/component').V3Radio;
		V3RadioButton: typeof import('../components/component').V3RadioButton;
		V3RadioGroup: typeof import('../components/component').V3RadioGroup;
		V3Row: typeof import('../components/component').V3Row;
		V3Col: typeof import('../components/component').V3Col;
		V3Select: typeof import('../components/component').V3Select;
		V3SelectOption: typeof import('../components/component').V3SelectOption;
		V3Slider: typeof import('../components/component').V3Slider;
		V3Space: typeof import('../components/component').V3Space;
		V3Switch: typeof import('../components/component').V3Switch;
		V3Tag: typeof import('../components/component').V3Tag;
		V3Tooltip: typeof import('../components/component').V3Tooltip;
		useLoading: import('../components/component').V3LoadingHook;
		useMessage: import('../components/component').V3MessageHook;
		useThrottle: import('../hooks/hook').IUseThrottle;
		useDebounce: import('../hooks/hook').IUseDebounce;
		usePosition: import('../hooks/hook').IUsePosition;
		useResize: import('../hooks/hook').IUseResize;
	}

	export interface ComponentCustomProperties {
		$message: import('../components/message').V3MessageService;
		$loading: import('../components/loading').V3LoadingService;
	}
}

export {};
