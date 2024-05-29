// Volar
declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		V3Back: typeof import('../index').V3Back;
		V3Backdrop: typeof import('../index').V3Backdrop;
		V3Badge: typeof import('../index').V3Badge;
		V3BasePopper: typeof import('../index').V3BasePopper;
		V3Button: typeof import('../index').V3Button;
		V3Card: typeof import('../index').V3Card;
		V3Carousel: typeof import('../index').V3Carousel;
		V3Checkbox: typeof import('../index').V3Checkbox;
		V3CheckboxGroup: typeof import('../index').V3CheckboxGroup;
		V3DemoBlock: typeof import('../index').V3DemoBlock;
		V3Dialog: typeof import('../index').V3Dialog;
		V3Divider: typeof import('../index').V3Divider;
		V3Drawer: typeof import('../index').V3Drawer;
		V3Icon: typeof import('../index').V3Icon;
		V3Input: typeof import('../index').V3Input;
		V3InputNumber: typeof import('../index').V3InputNumber;
		V3InputTextarea: typeof import('../index').V3InputTextarea;
		V3Loading: typeof import('../index').V3Loading;
		V3Message: typeof import('../index').V3Message;
		V3Popconfirm: typeof import('../index').V3Popconfirm;
		V3Popover: typeof import('../index').V3Popover;
		V3ProgressLinear: typeof import('../index').V3ProgressLinear;
		V3ProgressCircular: typeof import('../index').V3ProgressCircular;
		V3Radio: typeof import('../index').V3Radio;
		V3RadioButton: typeof import('../index').V3RadioButton;
		V3RadioGroup: typeof import('../index').V3RadioGroup;
		V3Row: typeof import('../index').V3Row;
		V3Col: typeof import('../index').V3Col;
		V3Select: typeof import('../index').V3Select;
		V3SelectOption: typeof import('../index').V3SelectOption;
		V3Slider: typeof import('../index').V3Slider;
		V3Space: typeof import('../index').V3Space;
		V3Switch: typeof import('../index').V3Switch;
		V3Tag: typeof import('../index').V3Tag;
		V3Tooltip: typeof import('../index').V3Tooltip;
		useLoading: import('../index').V3LoadingHook;
		useMessage: import('../index').V3MessageHook;
		useThrottle: import('../index').IUseThrottle;
		useDebounce: import('../index').IUseDebounce;
		usePosition: import('../index').IUsePosition;
		useResize: import('../index').IUseResize;
	}

	export interface ComponentCustomProperties {
		$message: import('../index').V3MessageService;
		$loading: import('../index').V3LoadingService;
	}
}

export {};
