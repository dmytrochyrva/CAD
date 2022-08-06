export class Semicircle {
	constructor(ctx, points, strokeColor = 'white') {
		this.ctx = ctx;
		this.xStart = points[0].x;
		this.yStart = points[0].y;
		this.xEnd = points[1].x;
		this.yEnd = points[1].y;
		this.xLength = points[2].x;
		this.yLength = points[2].y;
		this.strokeColor = strokeColor;
	}

	draw() {
		const dX = this.xEnd - this.xStart;
		const dY = this.yEnd - this.yStart;
		const hyp = Math.sqrt(dX ** 2 + dY ** 2);
		const radius = Math.sqrt(dX ** 2 + dY ** 2);

		let eAngle = Math.PI * 2;
		let sAngle =
			this.xEnd > this.xStart
				? Math.asin(dY / hyp)
				: this.yEnd > this.yStart
				? Math.acos(dX / hyp)
				: -Math.acos(dX / hyp);

		if (this.xLength && this.yLength) {
			const dX = this.xLength - this.xStart;
			const dY = this.yLength - this.yStart;
			const hyp = Math.floor(Math.sqrt(dX ** 2 + dY ** 2));
			eAngle =
				this.xLength > this.xStart
					? Math.asin(dY / hyp)
					: this.yLength > this.yStart
					? Math.acos(dX / hyp)
					: -Math.acos(dX / hyp);
		}

		this.ctx.save();
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.lineWidth = 2;
		this.ctx.moveTo(this.xStart, this.yStart);
		this.ctx.beginPath();
		this.ctx.arc(this.xStart, this.yStart, radius, sAngle, eAngle);
		this.ctx.stroke();
		this.ctx.restore();
	}

	static preview(ctx, points) {
		const [start, end, length] = points;

		const dX = end.x - start.x;
		const dY = end.y - start.y;
		const textX = start.x + dX / 2 - 6;
		const textY = start.y + dY / 2 - 10;
		const hyp = Math.sqrt(dX ** 2 + dY ** 2);
		const radius = Math.floor(Math.sqrt(dX ** 2 + dY ** 2));

		let eAngle = Math.PI * 6;
		let sAngle =
			end.x > start.x
				? Math.asin(dY / hyp)
				: end.y > start.y
				? Math.acos(dX / hyp)
				: -Math.acos(dX / hyp);

		if (length) {
			const dX = length.x - start.x;
			const dY = length.y - start.y;
			const hyp = Math.sqrt(dX ** 2 + dY ** 2);
			eAngle =
				length.x > start.x
					? Math.asin(dY / hyp)
					: length.y > start.y
					? Math.acos(dX / hyp)
					: -Math.acos(dX / hyp);
		}

		ctx.save();
		ctx.fillStyle = 'gray';
		ctx.strokeStyle = 'gray';
		ctx.lineWidth = 1;
		ctx.setLineDash([5, 5]);
		ctx.beginPath();

		ctx.arc(start.x, start.y, radius, sAngle, eAngle);
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(end.x, end.y);

		ctx.stroke();
		ctx.fillText(`${radius}px`, textX, textY);
		ctx.restore();
	}
}
