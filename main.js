import { Context, Line, Circle } from './partials/index.js';

// Canvas Setup
const canvas = document.getElementById('cad');
const context = new Context(canvas);

// Figure Select
let selectedValue = 'line';
const clearBtn = document.getElementById('clear');
const figureSelect = document.getElementById('figure');

clearBtn.addEventListener('click', () => context.clearCanvas());
figureSelect.addEventListener('input', (e) => (selectedValue = e.target.value));

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

	createElement(selectedValue);
});

canvas.addEventListener('mousemove', (e) => {
	if (!firstClick) {
		previewElement(selectedValue, e.offsetX, e.offsetY);
	}
});

function createElement(element) {
	switch (element) {
		case 'line':
			const line = new Line(context.ctx, startX, startY, endX, endY);
			context.elements.push(line);
			break;
		case 'circle':
			const circle = new Circle(context.ctx, startX, startY, endX, endY);
			context.elements.push(circle);
			break;
	}

	context.updateCanvas();
}

function previewElement(element, xEnd, yEnd) {
	context.updateCanvas();

	switch (element) {
		case 'line':
			Line.preview(context.ctx, startX, startY, xEnd, yEnd);
			break;
		case 'circle':
			Circle.preview(context.ctx, startX, startY, xEnd, yEnd);
			break;
	}
}
