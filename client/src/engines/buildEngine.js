import getEvaluationMethod from './evaluationMethods';

const DEFAULT_AXIS = 0.5;

const getRef = (circuit, id) => {
	for (let i = 0; i < circuit.input.length; i++) {
		if (circuit.input[i].id === id) {
			return circuit.input[i];
		}
	}
	// check circuit internal logic
	for (let i = 0; i < circuit.parts.length; i++) {
		if (circuit.parts[i].id === id) {
			return circuit.parts[i];
		}
	}
	console.log('Printing broken refs in getRef(): ', circuit, id);
};

const solderInputPins = (board, circuit) => {
	if (board.input.length !== circuit.input.length) {
		console.log('circuit input is not soldered properly: ', circuit);
	}
	for (let i = 0; i < board.input.length; i++) {
		circuit.input[i].ref = board.input[i].ref;
		if (!(board.input[i].pin === null || board.input[i].pin === undefined)) {
			circuit.input[i].pin = board.input[i].pin;
		}
	}
};

const solderOutputPins = (board, circuit) => {
	for (let i = 0; i < circuit.output.length; i++) {
		board.output[i] = circuit.output[i];
	}
};

const initializeOutput = rawInput => {
	if (rawInput.type === 'SINGLE_INPUT') {
		return false;
	} else {
		return Array(rawInput.size).fill(false);
	}
};

const initCircuit = circuitData => {
	const tempCircuit = {};
	//build step
	tempCircuit.input = [];
	for (let i = 0; i < circuitData.input.length; i++) {
		tempCircuit.input[i] = circuitData.input[i];
		tempCircuit.input[i].output = initializeOutput(circuitData.input[i]);
		tempCircuit.input[i].type = circuitData.input[i].type;
	}

	tempCircuit.parts = [];
	for (let i = 0; i < circuitData.parts.length; i++) {
		tempCircuit.parts[i] = circuitData.parts[i];

		if (tempCircuit.parts[i].type !== 'CIRCUIT') {
			//TODO:default state should also be definable for dependant logic
			tempCircuit.parts[i].output = false;
		} else {
			tempCircuit.parts[i].output = [];
			for (let j = 0; j < circuitData.output.length; j++) {
				tempCircuit.parts[i].output[j] = {};
				tempCircuit.parts[i].output[j].output = false;
			}
		}

		if (circuitData.parts[i].hasOwnProperty('axis')) {
			if (Array.isArray(circuitData.parts[i].axis)) {
				if (circuitData.parts[i].axis.length === circuitData.parts[i].input.length) {
					tempCircuit.parts[i].axis = circuitData.parts[i].axis;
				} else {
					// axis is an array but not of the correct length
					tempCircuit.parts[i].axis = circuitData.parts[i].axis;
					for (let j = tempCircuit.parts[i].axis.length; j < circuitData.parts[i].input.length; j++) {
						tempCircuit.parts[i].axis.push(DEFAULT_AXIS);
					}
				}
			} else {
				// axis exists but isn't an array
				const carriedPivotPoint = circuitData.parts[i].axis;
				tempCircuit.parts[i].axis = [];
				tempCircuit.parts[i].axis[0] = carriedPivotPoint;
				for (let j = 1; j < circuitData.parts[i].input.length; j++) {
					tempCircuit.parts[i].axis.push(DEFAULT_AXIS);
				}
			}
		} else {
			tempCircuit.parts[i].axis = [];
			for (let j = 0; j < circuitData.parts[i].input.length; j++) {
				tempCircuit.parts[i].axis.push(DEFAULT_AXIS);
			}
		}
	}

	tempCircuit.output = [];

	for (let i = 0; i < circuitData.output.length; i++) {
		tempCircuit.output[i] = circuitData.output[i];
		tempCircuit.output[i].type = circuitData.output[i].type;
		if (circuitData.output[i].hasOwnProperty('axis')) {
			tempCircuit.output[i].axis = circuitData.output[i].axis;
		} else {
			tempCircuit.output[i].axis = DEFAULT_AXIS;
		}
		tempCircuit.output[i].output = false;
	}
	deserializeCircuit(tempCircuit);
	return tempCircuit;
};

const deserializeCircuit = circuit => {
	circuit.parts.forEach(part => {
		part.input = part.input.map(inputString => {
			const input = {};
			let parsedInputID = '';
			const divider = inputString.indexOf(':');
			if (divider === -1) {
				parsedInputID = inputString;
				input.pin = null;
			} else {
				parsedInputID = inputString.substring(0, divider);
				input.pin = parseInt(inputString.substring(divider + 1, inputString.length), 10);
			}
			input.ref = getRef(circuit, parsedInputID);
			return input;
		});

		if (part.type !== 'CIRCUIT') {
			part.evaluate = getEvaluationMethod(part.type);
		} else {
			part.cid = part.circuit.cid;
			part.name = part.circuit.name;
			part.description = part.circuit.description;
			part.path = part.circuit.path;
			part.height = part.circuit.height;
			part.width = part.circuit.width;
			// Make recursive call
			part.circuit = initCircuit(part.circuit);
			solderOutputPins(part, part.circuit);
			solderInputPins(part, part.circuit);
			part.evaluate = () =>
				console.log('evaluate called on a circuit, type must be declared in uppercase: CIRCUIT');
		}
		return part;
	});

	circuit.output = circuit.output.map(output => {
		let input = output.input;
		let parsedInputID = '';
		let divider = input.indexOf(':');

		if (divider === -1) {
			parsedInputID = input;
			output.input = {};
			output.input.pin = null;
		} else {
			parsedInputID = input.substring(0, divider);
			output.input = {};
			output.input.pin = parseInt(input.substring(divider + 1, input.length), 10);
		}
		output.input.ref = getRef(circuit, parsedInputID);
		return output;
	});
};

export default circuitData => {
	const temp = initCircuit(circuitData);
	temp.name = circuitData.name;
	return temp;
};
