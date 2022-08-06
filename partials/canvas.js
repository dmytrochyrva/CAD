export class Context {
	constructor(canvas) {
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width = canvas.parentElement.offsetWidth;
		this.height = canvas.height = canvas.parentElement.offsetHeight;

		// Drawn Element
		this.elements = [];
	}

	clearCanvas() {
		this.elements = [];
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	updateCanvas() {
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.elements.forEach((element) => element.draw());
	}
}
