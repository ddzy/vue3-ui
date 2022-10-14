export type ISwitchModelValue = boolean | string | number;
export interface ISwitchProps {
	modelValue: ISwitchModelValue;
	disabled: boolean;
	loading: boolean;
	width: number;
	activeIcon: string;
	inactiveIcon: string;
	activeLabel: string;
	inactiveLabel: string;
	activeValue: ISwitchModelValue;
	inactiveValue: ISwitchModelValue;
	activeColor: string;
	inactiveColor: string;
}
