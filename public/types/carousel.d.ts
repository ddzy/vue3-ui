export type ICarouselEffect = 'fade' | 'slide';
export type ICarouselDirection = 'horizontal' | 'vertical';
export type ICarouselShowArrow = 'always' | 'hover' | 'never';
export type ICarouselIndicatorType = 'dot' | 'line';

export interface ICarouselProps {
	modelValue: number;
	width: number;
	height: number;
	effect: ICarouselEffect;
  autoplay: boolean;
  pauseOnHover: boolean;
	duration: number;
	timingFunction: string;
	disabled: boolean;
	direction: ICarouselDirection;
	showArrow: ICarouselShowArrow;
	showIndicator: boolean;
	indicatorType: ICarouselIndicatorType;
}
