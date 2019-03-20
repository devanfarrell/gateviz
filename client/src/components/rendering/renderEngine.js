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
	if (state) {
		return trueColor;
	} else {
		return falseColor;
	}
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

export const render = (canvas, fullCircuit, breadcrumbs) => {
	let circuit = fullCircuit;
	const preparedBreadcrumbs = breadcrumbs.shift().toJS();
	for (let i = 0; i < preparedBreadcrumbs.length; i++) {
		circuit = traverseCircuit(preparedBreadcrumbs[i].id, circuit);
	}

	//clear here saves a redundant function and really doesn't affect performance
	canvas.clear();
	//inputs
	for (let i = 0; i < circuit.input.length; i++) {
		const partDrawingInput = getTypeData(circuit.input[i].type);
		const path = canvas
			.path(partDrawingInput.path)
			.move(circuit.input[i].coord[0], circuit.input[i].coord[1]);
		path.stroke({
			color: '#000',
			linecap: 'round',
			linejoin: 'round',
			width: 2
		});
		path.size(partDrawingInput.width, partDrawingInput.height);
		// TODO: correct to pin for multi-inputs
		if (circuit.input[i].output) {
			path.fill(trueColor);
		} else {
			path.fill(falseColor);
		}
		if (circuit.input[i].hasOwnProperty('label')) {
			const label = canvas.text(circuit.input[i].label);
			label.move(circuit.input[i].coord[0], circuit.input[i].coord[1] - 20).font({
				family: 'Helvetica',
				fill: '#000'
			});
		}
	}

	// internal logic
	for (let i = 0; i < circuit.parts.length; i++) {
		const renderSpecs = {};
		switch (circuit.parts[i].type) {
			case 'AND':
			case 'NAND':
			case 'OR':
			case 'NOR':
			case 'XOR':
			case 'NOT':
				renderSpecs = getTypeData(circuit.parts[i].type);
				break;
			default:
				renderSpecs.path = circuit.parts[i].path;
				renderSpecs.height = circuit.parts[i].height;
				renderSpecs.width = circuit.parts[i].width;
		}

		const path = canvas
			.path(renderSpecs.path)
			.move(circuit.parts[i].coord[0], circuit.parts[i].coord[1]);
		path.stroke({
			color: '#000',
			linecap: 'round',
			linejoin: 'round',
			width: 2
		});

		path.size(renderSpecs.width, renderSpecs.height);

		if (circuit.parts[i].type !== 'CIRCUIT') {
			if (circuit.parts[i].output) {
				path.fill(trueColor);
			} else {
				path.fill(falseColor);
			}
		} else {
			circuit.parts[i].localRef = path;
			internalCircuitclickEvent(circuit.parts[i].localRef, circuit.parts[i].id, circuit.parts[i].name);
			path.fill(componentFillColor);
		}
	}

	//outputs
	for (let i = 0; i < circuit.output.length; i++) {
		const partDrawingOutput = getTypeData(circuit.output[i].type);
		const path = canvas
			.path(partDrawingOutput.path)
			.move(circuit.output[i].coord[0], circuit.output[i].coord[1]);
		path.stroke({
			color: '#000',
			linecap: 'round',
			linejoin: 'round',
			width: 2
		});
		path.size(partDrawingOutput.width, partDrawingOutput.height);
		if (circuit.output[i].output) {
			path.fill(trueColor);
		} else {
			path.fill(falseColor);
		}
	}

	//display edges here

	/* __________________________________________________
	|Draw edges connected to outputs
	|___________________________________________________
	|
	|
	*/

	for (let i = 0; i < circuit.output.length; i++) {
		let originX = null;
		let originY = null;
		let destinationX = null;
		let destinationY = null;
		let axis = circuit.output[i].axis;

		// CASE 1: ALL - OUTPUT
		if (circuit.output[i].type === SINGLE_OUTPUT_TYPE) {
			destinationX = circuit.output[i].coord[0];
			destinationY = circuit.output[i].coord[1] + getTypeData(circuit.output[i].type).height / 2;
			//CASE 1.1 SIMPLE - OUTPUT
			if (circuit.output[i].input.pin == null) {
				originX =
					circuit.output[i].input.ref.coord[0] + getTypeData(circuit.output[i].input.ref.type).width;
				originY =
					circuit.output[i].input.ref.coord[1] +
					getTypeData(circuit.output[i].input.ref.type).height / 2;
				//CASE 1.2 COMPLEX - OUTPUT
			} else {
				originX = circuit.output[i].input.ref.coord[0] + circuit.output[i].input.ref.width;
				originY = circuit.output[i].input.ref.coord[1] + circuit.output[i].input.ref.height / 2;
				const pin = circuit.output[i].input.pin;
				originY =
					originY +
					staggerInput(
						circuit.output[i].input.ref.output.length,
						pin,
						circuit.output[i].input.ref.height
					);
			}
			const path = canvas
				.polyline(
					`${originX},${originY} ${originX + (destinationX - originX) * axis},${originY} ${originX +
						(destinationX - originX) * axis},${destinationY}  ${destinationX},${destinationY}`
				)
				.fill('none')
				.stroke({ width: 2, color: colorHelper(circuit.output[i].output) });
			//TODO
			// CASE 2: ALL - OUTPUT_BUS
		} else {
			console.debug('CASE 2: ALL - OUTPUT_BUS');
		}
	}

	/* __________________________________________________
	|Draw edges from internal logic
	|___________________________________________________
	|
	|
	*/

	for (let i = 0; i < circuit.parts.length; i++) {
		let originX = null;
		let originY = null;
		let destinationX = null;
		let destinationY = null;
		const axis = circuit.parts[i].axis;
		// CASE 1: ALL - SIMPLE
		if (circuit.parts[i].type !== 'CIRCUIT') {
			for (let j = 0; j < circuit.parts[i].input.length; j++) {
				destinationX = circuit.parts[i].coord[0];
				destinationY = circuit.parts[i].coord[1] + getTypeData(circuit.parts[i].type).height / 2;
				let outputState = null;

				//CASE 1.1 SIMPLE - SIMPLE
				if (circuit.parts[i].input.pin == null) {
					destinationY =
						destinationY +
						staggerInput(circuit.parts[i].input.length, j, getTypeData(circuit.parts[i].type).height);
					originX =
						circuit.parts[i].input[j].ref.coord[0] +
						getTypeData(circuit.parts[i].input[j].ref.type).width;
					originY =
						circuit.parts[i].input[j].ref.coord[1] +
						getTypeData(circuit.parts[i].input[j].ref.type).height / 2;
					outputState = circuit.parts[i].input[j].ref.output;
					
					//CASE 1.2 COMPLEX - SIMPLE
				} else {
					originX = circuit.parts[i].input[j].ref.coord[0] + circuit.output[i].input[j].ref.width;
					originY = circuit.parts[i].input[j].ref.coord[1] + circuit.output[i].input[j].ref.height / 2;
					const pin = circuit.parts[i].input[j].pin;
					originY =
						originY +
						staggerInput(
							circuit.parts[i].input[j].ref.output.length,
							pin,
							circuit.parts[i].input[j].ref.height
						);
					outputState = circuit.output[i].input.ref.output[pin].output;
				}
				const path = canvas
					.polyline(
						`${originX},${originY} ${originX + (destinationX - originX) * axis[j]},${originY} ${originX +
							(destinationX - originX) * axis[j]},${destinationY}  ${destinationX},${destinationY}`
					)
					.fill('none')
					.stroke({ width: 2, color: colorHelper(outputState) });
			}
			// CASE 2: ALL - COMPLEX
		} else {
			for (let j = 0; j < circuit.parts[i].input.length; j++) {
				let outputState = null;
				destinationX = circuit.parts[i].coord[0];
				destinationY = circuit.parts[i].coord[1] + circuit.parts[i].height / 2;
				//CASE 2.1 SIMPLE - COMPLEX
				if (circuit.parts[i].input[j].pin === null) {
					destinationY =
						destinationY + staggerInput(circuit.parts[i].input.length, j, circuit.parts[i].height);
					originX =
						circuit.parts[i].input[j].ref.coord[0] +
						getTypeData(circuit.parts[i].input[j].ref.type).width;
					originY =
						circuit.parts[i].input[j].ref.coord[1] +
						getTypeData(circuit.parts[i].input[j].ref.type).height / 2;
					outputState = circuit.parts[i].input[j].ref.output;
					//CASE 2.1 COMPLEX - COMPLEX
				} else {
					const pin = circuit.parts[i].input[j].pin;
					destinationY =
						destinationY + staggerInput(circuit.parts[i].input.length, j, circuit.parts[i].height);
					originX =
						circuit.parts[i].input[j].ref.coord[0] +
						getTypeData(circuit.parts[i].input[j].ref.type).width;
					originY =
						circuit.parts[i].input[j].ref.coord[1] +
						getTypeData(circuit.parts[i].input[j].ref.type).height / 2;
					outputState = circuit.parts[i].input[j].ref.output[pin];
					
				}
				const path = canvas
					.polyline(
						`${originX},${originY} ${originX + (destinationX - originX) * axis[j]},${originY} ${originX +
							(destinationX - originX) * axis[j]},${destinationY}  ${destinationX},${destinationY}`
					)
					.fill('none')
					.stroke({ width: 2, color: colorHelper(outputState) });
			}
		}
	}
};
