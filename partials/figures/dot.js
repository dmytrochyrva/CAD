export class Dot {
	constructor(ctx, points, fillColor = 'white') {
		this.ctx = ctx;
		this.xStart = points[0].x;
		this.yStart = points[0].y;
		this.fillColor = fillColor;
	}

	draw() {
		this.ctx.save();
		this.ctx.fillStyle = this.fillColor;
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.arc(this.xStart, this.yStart, 2, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.restore();
	}

	static preview(ctx, points) {
		const [start] = points;

		ctx.save();
		ctx.fillStyle = 'gray';
		ctx.beginPath();
		ctx.arc(start.x, start.y, 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
}
