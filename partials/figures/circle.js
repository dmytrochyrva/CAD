export class Circle {
	constructor(ctx, points, strokeColor = 'white') {
		this.ctx = ctx;
		this.xStart = points[0].x;
		this.yStart = points[0].y;
		this.xEnd = points[1].x;
		this.yEnd = points[1].y;
		this.dX = this.xEnd - this.xStart;
		this.dY = this.yEnd - this.yStart;
		this.radius = Math.sqrt(this.dX ** 2 + this.dY ** 2);
		this.strokeColor = strokeColor;
	}

	draw() {
		this.ctx.save();
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.lineWidth = 2;
		this.ctx.moveTo(this.xStart, this.yStart);
		this.ctx.beginPath();
		this.ctx.arc(this.xStart, this.yStart, this.radius, 0, Math.PI * 2);
		this.ctx.stroke();
		this.ctx.restore();
	}

	select(x, y) {
		const xStart = this.xStart - this.radius - 2;
		const xEnd = this.xStart + this.radius - 2;
		const yStart = this.yStart - this.radius - 2;
		const yEnd = this.yStart + this.radius - 2;

		if (xStart < x && x < xEnd && yStart < y && y < yEnd) {
			return true;
		}

		return false;
	}

	selectedFrame() {
		this.ctx.save();
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.fillStyle = this.strokeColor;
		this.ctx.lineWidth = 0.2;
		this.ctx.setLineDash([5, 5]);
		this.ctx.strokeRect(
			this.xStart - this.radius - 4,
			this.yStart - this.radius - 4,
			this.radius * 2 + 8,
			this.radius * 2 + 8,
		);
		this.ctx.beginPath();
		this.ctx.arc(this.xStart, this.yStart, 1, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.restore();
	}

	static preview(ctx, points) {
		const [start, end] = points;

		if (!end) {
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = 'gray';
			ctx.arc(start.x, start.y, 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
			return;
		}

		const dX = end.x - start.x;
		const dY = end.y - start.y;
		const textX = start.x + dX / 2 - 6;
		const textY = start.y + dY / 2 - 10;
		const radius = Math.floor(Math.sqrt(dX ** 2 + dY ** 2));

		ctx.save();
		ctx.fillStyle = 'gray';
		ctx.strokeStyle = 'gray';
		ctx.lineWidth = 1;
		ctx.setLineDash([5, 5]);
		ctx.beginPath();

		ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
		ctx.fillText(`${radius}px`, textX, textY);
		ctx.restore();
	}
}
