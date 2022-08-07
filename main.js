import { Context, Dot, Line, Circle, Semicircle, Rectangle } from './partials/index.js';

// Canvas Setup
const canvas = document.getElementById('cad');
const context = new Context(canvas);

// Figure Select
let snapPoint = null;
let selectedValue = 'dot';
let mouseX;
let mouseY;
let mouseDown;

const snapBtn = document.getElementById('snap');
const gridBtn = document.getElementById('grid');
const gridStep = document.getElementById('grid-step');
const clearBtn = document.getElementById('clear');
const exportBtn = document.getElementById('export');
const figureSelect = document.getElementById('figure');

snapBtn.addEventListener('click', () => context.toggleSnap());
gridBtn.addEventListener('click', () => context.toggleGrid());
gridStep.addEventListener('input', ({ target }) => context.setGridStep(+target.value));
clearBtn.addEventListener('click', () => context.clearCanvas());
exportBtn.addEventListener('click', () => context.exportImage());
figureSelect.addEventListener('input', (e) => (selectedValue = e.target.value));

const points = [];
const componentsHistory = [];
const componentsMap = {
	dot: {
		class: Dot,
		points: 1,
	},
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
	rectangle: {
		class: Rectangle,
		points: 2,
	},
};

canvas.addEventListener('click', (e) => {
	if (!context.selectedComponents.length) {
		let point = snapPoint ? snapPoint : { x: e.offsetX, y: e.offsetY };
		points.push(point);
	}

	createElement(selectedValue, points);
});

canvas.addEventListener('mousemove', (e) => {
	snapPoint = context.gridSnap(e.offsetX, e.offsetY);

	context.elements.forEach((element) => {
		if (element.gridSnap) {
			snapPoint = element.gridSnap(e.offsetX, e.offsetY);
		}

		if (!snapPoint) {
			snapPoint = context.gridSnap(e.offsetX, e.offsetY);
		}
	});

	if (mouseDown) {
		const dX = e.offsetX - mouseX;
		const dY = e.offsetY - mouseY;

		context.selectedComponents.forEach((component) => {
			if (snapPoint) {
				component.xStart = snapPoint.x;
				component.yStart = snapPoint.y;
			} else {
				component.xStart += dX;
				component.yStart += dY;
			}
		});

		context.updateCanvas();
		mouseX = e.offsetX;
		mouseY = e.offsetY;
		return;
	}

	let tempPoints = [...points, { x: e.offsetX, y: e.offsetY }];

	if (snapPoint) {
		tempPoints = [...points, snapPoint];
	}

	context.updateCanvas();
	componentsMap[selectedValue].class.preview(context.ctx, tempPoints);
});

canvas.addEventListener('mousedown', (e) => {
	mouseX = e.offsetX;
	mouseY = e.offsetY;
	mouseDown = true;

	if (!points.length) {
		if (!e.shiftKey) {
			context.selectedComponents.length = 0;
		}

		context.elements.forEach((element) => {
			let selected;
			// Remove check
			if (element.select) {
				selected = element.select(e.offsetX, e.offsetY);
			}

			if (selected && !context.selectedComponents.length) {
				context.selectedComponents.push(element);
				context.updateCanvas();
			}

			if (selected && e.shiftKey) {
				context.selectedComponents.push(element);
				context.updateCanvas();
			}
		});
	}
});

canvas.addEventListener('mouseup', (e) => {
	mouseDown = false;
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

function initKeyMap() {
	window.addEventListener('keydown', (e) => {
		if (e.key.toLowerCase() === 'z' && e.ctrlKey && e.shiftKey) {
			const undoneComponent = componentsHistory.pop();

			if (undoneComponent) {
				context.elements.push(undoneComponent);
				points.length = 0;
				context.updateCanvas();
			}
			return;
		}
		if (e.key.toLowerCase() === 'z' && e.ctrlKey) {
			componentsHistory.push(context.elements.pop());
			points.length = 0;
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
context.updateCanvas();
