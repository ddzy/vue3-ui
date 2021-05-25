export default {
	zIndex: 2000,
	getNextZIndex(): number {
		return ++this.zIndex;
	},
	getCurrentZIndex(): number {
		return this.zIndex;
	},
	getPrevZIndex(): number {
		return this.zIndex - 1;
	},
};
