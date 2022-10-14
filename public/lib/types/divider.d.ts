export type IDividerDirection = 'vertical' | 'horizontal';
export type IDividerContentPosition = 'start' | 'end' | 'center';

export interface IDividerProps {
	direction: IDividerDirection;
	contentPosition: IDividerContentPosition;
}
