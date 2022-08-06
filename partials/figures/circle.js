export class Circle {
	constructor(ctx, xStart, yStart, xEnd, yEnd, strokeColor = 'white') {
		this.ctx = ctx;
		this.xStart = xStart;
		this.yStart = yStart;
		this.xEnd = xEnd;
		this.yEnd = yEnd;
		this.strokeColor = strokeColor;
	}

	draw() {
		const dX = this.xEnd - this.xStart;
		const dY = this.yEnd - this.yStart;
		const radius = Math.sqrt(dX ** 2 + dY ** 2);

		this.ctx.save();
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.lineWidth = 2;
		this.ctx.moveTo(this.xStart, this.yStart);
		this.ctx.beginPath();
		this.ctx.arc(this.xStart, this.yStart, radius, 0, Math.PI * 2);
		this.ctx.stroke();
		this.ctx.restore();
	}

	static preview(ctx, xStart, yStart, xEnd, yEnd) {
		const dX = xEnd - xStart;
		const dY = yEnd - yStart;
		const textX = xStart + dX / 2 - 6;
		const textY = yStart + dY / 2 - 10;
		const radius = Math.floor(Math.sqrt(dX ** 2 + dY ** 2));

		ctx.save();
		ctx.fillStyle = 'gray';
		ctx.strokeStyle = 'gray';
		ctx.lineWidth = 1;
		ctx.setLineDash([5, 5]);
		ctx.beginPath();
		ctx.moveTo(xStart, yStart);
		ctx.lineTo(xEnd, yEnd);
		ctx.arc(xStart, yStart, radius, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillText(`${radius}px`, textX, textY);
		ctx.restore();
	}
}
