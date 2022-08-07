import { Context, Dot, Line, Circle, Semicircle, Rectangle } from './partials/index.js';

// Canvas Setup
const canvas = document.getElementById('cad');
const context = new Context(canvas);

// Figure Select
let selectedValue = 'dot';
const gridBtn = document.getElementById('grid');
const clearBtn = document.getElementById('clear');
const exportBtn = document.getElementById('export');
const figureSelect = document.getElementById('figure');

gridBtn.addEventListener('click', () => context.toggleGrid());
clearBtn.addEventListener('click', () => context.clearCanvas());
exportBtn.addEventListener('click', () => context.exportImage());
figureSelect.addEventListener('input', (e) => (selectedValue = e.target.value));

const points = [];
const selectedComponents = [];
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
	context.updateCanvas();
	selectedComponents.length = 0;

	if (!points.length) {
		context.elements.forEach((element) => {
			let selected;
			// Remove check
			if (element.select) {
				selected = element.select(e.offsetX, e.offsetY);
			}

			if (selected) {
				selectedComponents.push(element);
			}
		});
	}

	if (!selectedComponents.length) {
		points.push({ x: e.offsetX, y: e.offsetY });
	}

	createElement(selectedValue, points);
});

canvas.addEventListener('mousemove', (e) => {
	const selected = componentsMap[selectedValue];
	if (points.length || selected.points === 1) {
		const tempPoints = [...points, { x: e.offsetX, y: e.offsetY }];

		context.updateCanvas();
		componentsMap[selectedValue].class.preview(context.ctx, tempPoints);
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
context.updateCanvas();
