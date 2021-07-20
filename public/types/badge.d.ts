export type IBadgeValue = number | string;
export type IBadgeType = 'primary' | 'success' | 'danger' | 'warning' | 'info';

export interface IBadgeProps {
	value: IBadgeValue;
  type: IBadgeType;
  backgroundColor: string;
  color: string;
  max: number;
  dot: boolean;
}
