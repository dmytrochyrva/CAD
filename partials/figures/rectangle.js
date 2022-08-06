export class Rectangle {
	constructor(ctx, points, strokeColor = 'white') {
		this.ctx = ctx;
		this.xStart = points[0].x;
		this.yStart = points[0].y;
		this.xEnd = points[1].x;
		this.yEnd = points[1].y;
		this.strokeColor = strokeColor;
	}

	draw() {
		const dX = this.xEnd - this.xStart;
		const dY = this.yEnd - this.yStart;

		this.ctx.save();
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(this.xStart, this.yStart, dX, dY);
		this.ctx.restore();
	}

	static preview(ctx, points) {
		const [start, end] = points;

		const dX = end.x - start.x;
		const dY = end.y - start.y;
		const textX = start.x + dX / 2 - 10;
		const textY = start.y + dY / 2;

		ctx.save();
		ctx.fillStyle = 'gray';
		ctx.strokeStyle = 'gray';
		ctx.lineWidth = 1;
		ctx.setLineDash([5, 5]);
		ctx.strokeRect(start.x, start.y, dX, dY);
		ctx.fillText(`${Math.abs(dX)}px`, textX, start.y - 8);
		ctx.fillText(`${Math.abs(dY)}px`, end.x + 5, textY);
		ctx.restore();
	}
}
