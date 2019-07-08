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
	board.input.forEach((input, i) => {
		circuit.input[i].ref = input.ref;
		if (!(input.pin === null || input.pin === undefined)) {
			circuit.input[i].pin = input.pin;
		}
	});
};

const solderOutputPins = (circuit, part) => {
	part.output.forEach((output, i) => {
		circuit.output[i] = output;
	});
};

const initializeOutput = rawInput => {
	return rawInput.type === 'SINGLE_INPUT' ? false : Array(rawInput.size).fill(false);
};

const initCircuit = circuitData => {
	const circuit = {};
	//build step
	circuit.input = circuitData.input.map(input => {
		const obj = input;
		obj.state = initializeOutput(input);
		return obj;
	});

	circuit.parts = circuitData.parts.map(partData => {
		const part = partData;
		// Set outputs
		if (partData.type !== 'CIRCUIT') {
			part.state = false;
		} else {
			// TODO: figure out... why...
			part.output = Array(circuitData.output.length).fill({ output: false });
		}

		// set axis
		if (!!partData.axis) {
			if (Array.isArray(partData.axis)) {
				if (partData.axis.length === partData.input.length) {
					part.axis = partData.axis;
				} else {
					part.axis = partData.axis.concat(
						Array(partData.input.length - partData.axis.length).fill(DEFAULT_AXIS)
					);
				}
			} else {
				if (!!Number(partData.axis)) {
					part.axis = Array(partData.input.length).fill(partData.axis);
				} else {
					part.axis = Array(partData.input.length).fill(DEFAULT_AXIS);
				}
			}
		} else {
			part.axis = Array(partData.input.length).fill(DEFAULT_AXIS);
		}
		return part;
	});

	circuit.output = circuitData.output.map(outputData => {
		const obj = outputData;
		obj.axis = !!outputData.axis ? outputData.axis : DEFAULT_AXIS;
		obj.state = false;
		return obj;
	});
	deserializeCircuit(circuit);
	return circuit;
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
	const completeCircuit = initCircuit(circuitData);
	completeCircuit.name = circuitData.name;
	return completeCircuit;
};
