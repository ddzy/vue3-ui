export function handleTransitionEnter(el: HTMLElement): void {
	el.style.height = 'auto';
	const offsetHeight = el.offsetHeight;
	el.style.height = '0px';
	el.offsetHeight;
	el.style.height = `${offsetHeight}px`;
}
export function handleTransitionLeave(el: HTMLElement): void {
	el.style.height = '0px';
}
