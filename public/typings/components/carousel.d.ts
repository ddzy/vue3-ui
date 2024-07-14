import { Ref } from 'vue';
import { SFCWithInstall } from '../index';


export interface ICarouselProps {
	modelValue?: number;
	width?: number | string;
	height?: number | string;
	effect?: ICarouselEffect;
	autoplay?: ICarouselAutoplay;
	duration?: number;
	timingFunction?: string;
	disabled?: boolean;
	direction?: ICarouselDirection;
	showArrow?: ICarouselShowArrow;
	showIndicator?: boolean;
	indicatorType?: ICarouselIndicatorType;
	indicatorPosition?: ICarouselIndicatorPosition;
}
export type ICarouselEffect = 'fade' | 'slide';
export type ICarouselDirection = 'horizontal' | 'vertical';
export type ICarouselShowArrow = 'always' | 'hover' | 'never';
export type ICarouselIndicatorType = 'dot' | 'line';
export type ICarouselIndicatorPosition = 'left' | 'top' | 'right' | 'bottom';
export type ICarouselAutoplay =
	| boolean
	| {
			interval?: number;
			pauseOnHover?: boolean;
	  };
export interface ICarouselItemProps {}

export interface ICarouselProvide {
	props: ICarouselProps;
	slideDirection: Ref<'prev' | 'next'>;
	addCarouselItem: (v: ICarouselItemProvide) => void;
}
export interface ICarouselItemProvide {
	props: ICarouselItemProps;
	updateActive: (v: boolean) => void; 
}


export const V3Carousel: SFCWithInstall<ICarouselProps>;
