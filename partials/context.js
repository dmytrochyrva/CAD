export class Context {
	constructor(canvas) {
		this.showGrid = false;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width = canvas.parentElement.offsetWidth;
		this.height = canvas.height = canvas.parentElement.offsetHeight;

		// Drawn Element
		this.elements = [];
	}

	clearCanvas() {
		this.elements = [];
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.drawGrid();
	}

	updateCanvas() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.drawGrid();

		this.elements.forEach((element) => element.draw());
	}

	exportImage() {
		const link = document.createElement('a');
		const image = this.canvas.toDataURL('image/png');

		link.href = image;
		link.download = `${new Date().toISOString()}.png`;
		link.click();
	}

	drawGrid() {
		if (this.showGrid) {
			for (let i = 20; i < this.width; i += 20) {
				for (let j = 20; j < this.width; j += 20) {
					this.ctx.save();
					this.ctx.fillStyle = 'gray';
					this.ctx.fillRect(i, j, 1, 1);
					this.ctx.restore();
				}
			}
		}
	}

	toggleGrid() {
		this.showGrid = !this.showGrid;
		this.updateCanvas();
	}
}
