export class Line {
	constructor(ctx, xStart, yStart, xEnd, yEnd, strokeColor = 'white') {
		this.ctx = ctx;
		this.xStart = xStart;
		this.yStart = yStart;
		this.xEnd = xEnd;
		this.yEnd = yEnd;
		this.strokeColor = strokeColor;
	}

	draw() {
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.moveTo(this.xStart, this.yStart);
		this.ctx.lineTo(this.xEnd, this.yEnd);
		this.ctx.stroke();
	}

	static preview(ctx, xStart, yStart, xEnd, yEnd) {
		ctx.strokeStyle = 'gray';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(xStart, yStart);
		ctx.lineTo(xEnd, yEnd);
		ctx.stroke();
	}
}
