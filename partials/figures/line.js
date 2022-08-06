export class Line {
	constructor(ctx, points, strokeColor = 'white') {
		this.ctx = ctx;
		this.xStart = points[0].x;
		this.yStart = points[0].y;
		this.xEnd = points[1].x;
		this.yEnd = points[1].y;
		this.strokeColor = strokeColor;
	}

	draw() {
		this.ctx.save();
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.moveTo(this.xStart, this.yStart);
		this.ctx.lineTo(this.xEnd, this.yEnd);
		this.ctx.stroke();
		this.ctx.restore();
	}

	static preview(ctx, points) {
		const [start, end] = points;

		const dX = end.x - start.x;
		const dY = end.y - start.y;
		const textX = start.x + dX / 2 - 6;
		const textY = start.y + dY / 2 - 10;
		const lineLength = Math.floor(Math.sqrt(dX ** 2 + dY ** 2));

		ctx.save();
		ctx.fillStyle = 'gray';
		ctx.strokeStyle = 'gray';
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.setLineDash([5, 5]);
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
		ctx.fillText(`${lineLength}px`, textX, textY);
		ctx.restore();
	}
}
