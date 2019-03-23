import * as svgjs from 'svgjs';
import { store } from '../../';
import { stepIntoCircuit } from '../../redux/actions';
import {
	componentFillColor,
	falseColor,
	getTypeData,
	SINGLE_OUTPUT_TYPE,
	trueColor
} from './constants';

const colorHelper = state => {
	return state ? trueColor : falseColor;
};

const internalCircuitclickEvent = (obj, id, name) => {
	obj.click(() => {
		store.dispatch(stepIntoCircuit({ id, name }));
	});
};

const staggerInput = (numPorts, position, heightOfObject) => {
	const midpoint = heightOfObject / 2;
	const segment = heightOfObject / numPorts;
	const unmodPosition = segment * position;
	const moddedPosition = unmodPosition + segment / 2;
	const variation = moddedPosition - midpoint;
	return variation;
};

export const initialize = ref => {
	return svgjs(ref).size(1000, 1000);
};

const traverseCircuit = (id, circuit) => {
	for (let i = 0; i < circuit.parts.length; i++) {
		if (id === circuit.parts[i].id) {
			return circuit.parts[i].circuit;
		}
	}
	console.log("Something is borked. Couldn't find ID from breadcrumb in render engine");
	return circuit;
};

export const render = (canvas, circuit, breadcrumbs) => {
	const preparedBreadcrumbs = breadcrumbs.shift().toJS();
	preparedBreadcrumbs.map(crumb => {
		circuit = traverseCircuit(crumb.id, circuit);
	});

	//clear here saves a redundant function and really doesn't affect performance
	canvas.clear();
	//inputs
	circuit.input.map(input => {
		const partDrawingInput = getTypeData(input.type);
		const path = canvas.path(partDrawingInput.path).move(input.coord[0], input.coord[1]);
		path.stroke({
			color: '#000',
			linecap: 'round',
			linejoin: 'round',
			width: 2
		});
		path.size(partDrawingInput.width, partDrawingInput.height);

		if (input.type === 'SINGLE_INPUT') {
			path.fill(colorHelper(input.output));
		} else {
			path.fill(componentFillColor);
		}

		if (!!input.label) {
			const label = canvas.text(input.label);
			label.move(input.coord[0], input.coord[1] - 20).font({
				family: 'Helvetica',
				fill: '#000'
			});
		}
	});

	// internal logic
	circuit.parts.map(part => {
		let renderSpecs = {};
		switch (part.type) {
			case 'CIRCUIT':
				renderSpecs.path = part.path;
				renderSpecs.height = part.height;
				renderSpecs.width = part.width;
				break;
			default:
				renderSpecs = getTypeData(part.type);
		}

		const path = canvas.path(renderSpecs.path).move(part.coord[0], part.coord[1]);
		path.stroke({
			color: '#000',
			linecap: 'round',
			linejoin: 'round',
			width: 2
		});

		path.size(renderSpecs.width, renderSpecs.height);

		if (part.type !== 'CIRCUIT') {
			path.fill(colorHelper(part.output));
		} else {
			part.localRef = path;
			internalCircuitclickEvent(part.localRef, part.id, part.name);
			path.fill(componentFillColor);
		}
	});

	//outputs
	circuit.output.map(output => {
		const partDrawingOutput = getTypeData(output.type);
		const path = canvas.path(partDrawingOutput.path).move(output.coord[0], output.coord[1]);
		path.stroke({
			color: '#000',
			linecap: 'round',
			linejoin: 'round',
			width: 2
		});
		path.size(partDrawingOutput.width, partDrawingOutput.height);
		path.fill(colorHelper(output.output));
	});

	// edges from parts to outputs
	circuit.output.map(output => {
		let originX = null;
		let originY = null;
		let destinationX = null;
		let destinationY = null;
		let axis = output.axis;

		// CASE 1: ALL - OUTPUT
		if (output.type === SINGLE_OUTPUT_TYPE) {
			destinationX = output.coord[0];
			destinationY = output.coord[1] + getTypeData(output.type).height / 2;
			//CASE 1.1 SIMPLE - OUTPUT
			if (output.input.pin == null) {
				originX = output.input.ref.coord[0] + getTypeData(output.input.ref.type).width;
				originY = output.input.ref.coord[1] + getTypeData(output.input.ref.type).height / 2;
				//CASE 1.2 COMPLEX - OUTPUT
			} else {
				originX = output.input.ref.coord[0] + output.input.ref.width;
				originY = output.input.ref.coord[1] + output.input.ref.height / 2;
				const pin = output.input.pin;
				originY = originY + staggerInput(output.input.ref.output.length, pin, output.input.ref.height);
			}
			const path = canvas
				.polyline(
					`${originX},${originY} ${originX + (destinationX - originX) * axis},${originY} ${originX +
						(destinationX - originX) * axis},${destinationY}  ${destinationX},${destinationY}`
				)
				.fill('none')
				.stroke({ width: 2, color: colorHelper(output.output) });
			// CASE 2: ALL - OUTPUT_BUS
		} else {
			console.debug('CASE 2: ALL - OUTPUT_BUS');
		}
	});

	// edges from parts to parts
	circuit.parts.map((part, i) => {
		let originX = null;
		let originY = null;
		let destinationX = null;
		let destinationY = null;
		const axis = part.axis;
		// CASE 1: ALL - SIMPLE

		if (part.type !== 'CIRCUIT') {
			part.input.map((input, j) => {
				destinationX = part.coord[0];
				destinationY = part.coord[1] + getTypeData(part.type).height / 2;
				let outputState = null;

				//CASE 1.1 SIMPLE - SIMPLE
				if (part.input.pin == null) {
					destinationY =
						destinationY + staggerInput(part.input.length, j, getTypeData(part.type).height);
					originX = input.ref.coord[0] + getTypeData(input.ref.type).width;
					originY = input.ref.coord[1] + getTypeData(input.ref.type).height / 2;
					outputState = input.ref.output;

					//CASE 1.2 COMPLEX - SIMPLE
				} else {
					originX = input.ref.coord[0] + circuit.output[i].input[j].ref.width;
					originY = input.ref.coord[1] + circuit.output[i].input[j].ref.height / 2;
					const pin = input.pin;
					originY = originY + staggerInput(input.ref.output.length, pin, input.ref.height);
					outputState = circuit.output[i].input.ref.output[pin].output;
				}
				const path = canvas
					.polyline(
						`${originX},${originY} ${originX + (destinationX - originX) * axis[j]},${originY} ${originX +
							(destinationX - originX) * axis[j]},${destinationY}  ${destinationX},${destinationY}`
					)
					.fill('none')
					.stroke({ width: 2, color: colorHelper(outputState) });
			});
			// CASE 2: ALL - COMPLEX
		} else {
			part.input.map((input, j) => {
				let outputState = null;
				destinationX = part.coord[0];
				destinationY = part.coord[1] + part.height / 2;
				//CASE 2.1 SIMPLE - COMPLEX
				if (input.pin === null) {
					destinationY = destinationY + staggerInput(part.input.length, j, part.height);
					originX = input.ref.coord[0] + getTypeData(input.ref.type).width;
					originY = input.ref.coord[1] + getTypeData(input.ref.type).height / 2;
					outputState = input.ref.output;
					//CASE 2.1 COMPLEX - COMPLEX
				} else {
					destinationY = destinationY + staggerInput(part.input.length, j, part.height);
					originX = input.ref.coord[0] + getTypeData(input.ref.type).width;
					originY = input.ref.coord[1] + getTypeData(input.ref.type).height / 2;
					outputState = input.ref.output[input.pin];
				}
				const path = canvas
					.polyline(
						`${originX},${originY} ${originX + (destinationX - originX) * axis[j]},${originY} ${originX +
							(destinationX - originX) * axis[j]},${destinationY}  ${destinationX},${destinationY}`
					)
					.fill('none')
					.stroke({ width: 2, color: colorHelper(outputState) });
			});
		}
	});
};
