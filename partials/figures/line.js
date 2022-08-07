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

	gridSnap(x, y) {
		if (x < this.xStart + 6 && x > this.xStart - 6 && y < this.yStart + 6 && y > this.yStart - 6) {
			return { x: this.xStart, y: this.yStart };
		}

		if (x < this.xEnd + 6 && x > this.xEnd - 6 && y < this.yEnd + 6 && y > this.yEnd - 6) {
			return { x: this.xEnd, y: this.yEnd };
		}

		return null;
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
		const lineLength = Math.floor(Math.sqrt(dX ** 2 + dY ** 2));

		ctx.save();
		ctx.fillStyle = 'gray';
		ctx.strokeStyle = 'gray';
		ctx.lineWidth = 1;
		ctx.setLineDash([5, 5]);
		ctx.beginPath();
		ctx.arc(start.x, start.y, 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
		ctx.arc(end.x, end.y, 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillText(`${lineLength}px`, textX, textY);
		ctx.restore();
	}
}
