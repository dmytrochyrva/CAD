export class Context {
	constructor(canvas) {
		this.gridStep = 40;
		this.showGrid = false;
		this.turnSnap = false;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width = canvas.parentElement.offsetWidth;
		this.height = canvas.height = canvas.parentElement.offsetHeight;

		// Drawn Element
		this.elements = [];
		this.selectedComponents = [];
	}

	clearCanvas() {
		this.elements = [];
		this.selectedComponents = [];
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.drawGrid();
	}

	updateCanvas() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.drawGrid();

		this.elements.forEach((element) => element.draw());
		this.selectedComponents.forEach((element) => element.selectedFrame());
	}

	exportImage() {
		const link = document.createElement('a');
		const image = this.canvas.toDataURL('image/png');

		link.href = image;
		link.download = `${new Date().toISOString()}.png`;
		link.click();
	}

	setGridStep(step) {
		this.gridStep = step;
		this.updateCanvas();
	}

	drawGrid() {
		if (this.showGrid) {
			for (let i = this.gridStep; i < this.width; i += this.gridStep) {
				for (let j = this.gridStep; j < this.width; j += this.gridStep) {
					this.ctx.save();
					this.ctx.fillStyle = 'gray';
					this.ctx.fillRect(i - 0.5, j - 0.5, 1, 1);
					this.ctx.restore();
				}
			}
		}
	}

	toggleGrid() {
		this.showGrid = !this.showGrid;
		this.updateCanvas();
	}

	toggleSnap() {
		this.turnSnap = !this.turnSnap;
	}

	gridSnap(x, y) {
		if (this.showGrid && this.turnSnap) {
			if (x % this.gridStep <= 10 && y % this.gridStep <= 10) {
				return { x: x - (x % this.gridStep), y: y - (y % this.gridStep) };
			}

			if (x % this.gridStep >= 10 && y % this.gridStep >= 10) {
				return {
					x: x + (this.gridStep - (x % this.gridStep)),
					y: y + (this.gridStep - (y % this.gridStep)),
				};
			}
		}

		return null;
	}
}
