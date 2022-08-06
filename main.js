import { Context, Line, Circle, Semicircle } from './partials/index.js';

// Canvas Setup
const canvas = document.getElementById('cad');
const context = new Context(canvas);

// Figure Select
let selectedValue = 'line';
const clearBtn = document.getElementById('clear');
const figureSelect = document.getElementById('figure');

clearBtn.addEventListener('click', () => context.clearCanvas());
figureSelect.addEventListener('input', (e) => (selectedValue = e.target.value));

const points = [];
const componentsHistory = [];
const componentsMap = {
	line: {
		class: Line,
		points: 2,
	},
	circle: {
		class: Circle,
		points: 2,
	},
	semicircle: {
		class: Semicircle,
		points: 3,
	},
};

canvas.addEventListener('mousedown', (e) => {
	points.push({ x: e.offsetX, y: e.offsetY });

	createElement(selectedValue, points);
});

canvas.addEventListener('mousemove', (e) => {
	if (points.length) {
		const tempPoints = [...points, { x: e.offsetX, y: e.offsetY }];

		previewElement(selectedValue, tempPoints);
	}
});

function createElement(figure, _points) {
	const selected = componentsMap[figure];

	if (selected.points === _points.length) {
		const element = new selected.class(context.ctx, _points);
		context.elements.push(element);
		points.length = 0;
		componentsHistory.length = 0;
		context.updateCanvas();
	}
}

function previewElement(figure, _points) {
	context.updateCanvas();

	componentsMap[figure].class.preview(context.ctx, _points);
}

function initKeyMap() {
	window.addEventListener('keydown', (e) => {
		if (e.key.toLowerCase() === 'z' && e.ctrlKey && e.shiftKey) {
			const undoneComponent = componentsHistory.pop();

			if (undoneComponent) {
				context.elements.push(undoneComponent);
				context.updateCanvas();
			}
			return;
		}
		if (e.key.toLowerCase() === 'z' && e.ctrlKey) {
			componentsHistory.push(context.elements.pop());
			context.updateCanvas();
			return;
		}
		if (e.key === 'Escape') {
			points.length = 0;
			context.updateCanvas();
			return;
		}
	});
}

initKeyMap();
