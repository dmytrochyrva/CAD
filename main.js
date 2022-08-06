import { Context, Line } from './partials/index.js';

// Figure Select
let selectedValue = '';
const figureSelect = document.getElementById('figure');
figureSelect.addEventListener('input', (e) => (selectedValue = e.target.value));
const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => context.clearCanvas());

// Canvas Setup
const canvas = document.getElementById('cad');
const context = new Context(canvas);

let firstClick = true;
let startX;
let startY;
let endX;
let endY;

canvas.addEventListener('mousedown', (e) => {
	if (firstClick) {
		startX = e.offsetX;
		startY = e.offsetY;
		firstClick = false;
		return;
	}

	endX = e.offsetX;
	endY = e.offsetY;
	firstClick = true;

	const line = new Line(context.ctx, startX, startY, endX, endY);
	context.elements.push(line);
	context.updateCanvas();
});

canvas.addEventListener('mousemove', (e) => {
	if (!firstClick) {
		context.updateCanvas();
		Line.preview(context.ctx, startX, startY, e.offsetX, e.offsetY);
	}
});
