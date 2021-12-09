export type ICarouselEffect = 'fade' | 'slide';
export type ICarouselDirection = 'horizontal' | 'vertical';
export type ICarouselShowArrow = 'always' | 'hover' | 'never';
export type ICarouselIndicatorType = 'dot' | 'line';
export type ICarouselAutoplay = boolean | {
	interval: number;
	pauseOnHover: boolean;
};

export interface ICarouselProps {
	modelValue: number;
	defaultIndex: number;
	width: number;
	height: number;
	effect: ICarouselEffect;
  autoplay: ICarouselAutoplay;
	duration: number;
	timingFunction: string;
	disabled: boolean;
	direction: ICarouselDirection;
	showArrow: ICarouselShowArrow;
	showIndicator: boolean;
	indicatorType: ICarouselIndicatorType;
}
