const DEFAULT_AXIS = 0.5;

const AND = input => {
	// TODO: Error handling if there is no input
	var counter = 0;
	for (var i = 0; i < input.length; i++) {
		if (input[i]) {
			counter++;
		}
	}
	return counter > 0 && counter === input.length;
};

const NAND = input => {
	// TODO: Error handling if there is no input
	var counter = 0;
	for (var i = 0; i < input.length; i++) {
		if (input[i]) {
			counter++;
		}
	}
	return !(counter > 0 && counter === input.length);
};

const OR = input => {
	// TODO: Error handling if there is no input
	for (var i = 0; i < input.length; i++) {
		if (input[i]) {
			return true;
		}
	}
	return false;
};

const NOR = input => {
	// TODO: Error handling if there is no input
	for (var i = 0; i < input.length; i++) {
		if (input[i]) {
			return false;
		}
	}
	return true;
};

const NOT = input => {
	// TODO: Error handling if there is no input or more than 1 input
	return !input;
};

const XOR = input => {
	// TODO: Error handling if there is not exactly 2 inputs
	return input[0] !== input[1];
};

function getRef(circuit, id) {
	for (var i = 0; i < circuit.input.length; i++) {
		if (circuit.input[i].id === id) {
			return circuit.input[i];
		}
	}
	// check circuit internal logic
	for (i = 0; i < circuit.parts.length; i++) {
		if (circuit.parts[i].id === id) {
			return circuit.parts[i]
		}
	}
	console.log('Printing broken refs in getRef(): ', circuit, id);
}

function solderInputPins(board, circuit) {
	if (board.input.length !== circuit.input.length) {

		console.log('circuit input is not soldered properly: ', circuit);
	}
	for (var i = 0; i < board.input.length; i++) {
		circuit.input[i].ref = board.input[i].ref;
	}
}

function solderOutputPins(board, circuit) {
	for (var i = 0; i < circuit.output.length; i++) {
		board.output[i] = circuit.output[i];
	}
}

function initCircuit(circuitData) {
	var tempCircuit = {};
	//build step
	tempCircuit.input = [];
	for (var i = 0; i < circuitData.input.length; i++) {
		tempCircuit.input[i] = circuitData.input[i];
		tempCircuit.input[i].output = false;
		tempCircuit.input[i].type = circuitData.input[i].type;
	}

	tempCircuit.parts = [];
	for (i = 0; i < circuitData.parts.length; i++) {
		tempCircuit.parts[i] = circuitData.parts[i];

		if (tempCircuit.parts[i].type !== 'CIRCUIT') {
			//TODO:default state should also be definable for dependant logic
			tempCircuit.parts[i].output = false;
		} else {
			tempCircuit.parts[i].output = [];
			for (var j = 0; j < circuitData.output.length; j++) {
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
					for (j = tempCircuit.parts[i].axis.length; j < circuitData.parts[i].input.length; j++) {
						tempCircuit.parts[i].axis.push(DEFAULT_AXIS);
					}
				}
			} else {
				// axis exists but isn't an array
				const carriedPivotPoint = circuitData.parts[i].axis;
				tempCircuit.parts[i].axis = [];
				tempCircuit.parts[i].axis[0] = carriedPivotPoint;
				for (j = 1; j < circuitData.parts[i].input.length; j++) {
					tempCircuit.parts[i].axis.push(DEFAULT_AXIS);
				}
			}

		} else {
			tempCircuit.parts[i].axis = [];
			for (j = 0; j < circuitData.parts[i].input.length; j++) {
				tempCircuit.parts[i].axis.push(DEFAULT_AXIS);
			}
		}
	}

	tempCircuit.output = [];

	for (i = 0; i < circuitData.output.length; i++) {
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
}


function deserializeCircuit(circuit) {
	//deserialize parts
	for (var i = 0; i < circuit.parts.length; i++) {
		//get reference for each input

		for (var j = 0; j < circuit.parts[i].input.length; j++) {
			// the input ID
			var input = circuit.parts[i].input[j];
			var parsedInputID = '';
			// if the gate's input is a component or a bus the output will need to be selected
			var divider = input.indexOf(':');
			if (divider === -1) {
				parsedInputID = input;
				circuit.parts[i].input[j] = {};
				circuit.parts[i].input[j].pin = null;
			} else {
				parsedInputID = input.substring(0, divider);
				// get the string version of input pin and convert to digit
				circuit.parts[i].input[j] = {};
				circuit.parts[i].input[j].pin = parseInt(
					input.substring(divider + 1, input.length),
					10
				);
			}
			circuit.parts[i].input[j].ref = getRef(circuit, parsedInputID);
		}
		var evaluationMethod = null;
		switch (circuit.parts[i].type) {
			case 'AND':
				evaluationMethod = AND;
				break;
			case 'NAND':
				evaluationMethod = NAND;
				break;
			case 'OR':
				evaluationMethod = OR;
				break;
			case 'NOR':
				evaluationMethod = NOR;
				break;
			case 'XOR':
				evaluationMethod = XOR;
				break;
			case 'NOT':
				evaluationMethod = NOT;
				break;
			case 'CIRCUIT':
				circuit.parts[i].cid = circuit.parts[i].circuit.cid;
				circuit.parts[i].name = circuit.parts[i].circuit.name;
				circuit.parts[i].description = circuit.parts[i].circuit.description;
				circuit.parts[i].path = circuit.parts[i].circuit.path;
				circuit.parts[i].height = circuit.parts[i].circuit.height;
				circuit.parts[i].width = circuit.parts[i].circuit.width;
				circuit.parts[i].circuit = initCircuit(circuit.parts[i].circuit);
				solderOutputPins(circuit.parts[i], circuit.parts[i].circuit);
				solderInputPins(circuit.parts[i], circuit.parts[i].circuit);
				evaluationMethod = () => console.log('evaluate called on a circuit, type must be declared in uppercase: CIRCUIT');
				break;
			default:
				console.log('something has done broke');
		}
		circuit.parts[i].evaluate = evaluationMethod;
	}
	//deserialize outputs
	for (i = 0; i < circuit.output.length; i++) {
		input = circuit.output[i].input;
		parsedInputID = '';

		// if the gate's input is a component or a bus the output will need to be selected
		divider = input.indexOf(':');
		if (divider === -1) {
			parsedInputID = input;
			circuit.output[i].input = {};
			circuit.output[i].input.pin = null;
		} else {
			parsedInputID = input.substring(0, divider);
			// get the string versin of input pin and convert to digit
			circuit.output[i].input = {};
			circuit.output[i].input.pin = parseInt(input.substring(divider + 1, input.length), 10);
		}
		circuit.output[i].input.ref = getRef(circuit, parsedInputID);
	}

}

export default circuitData => {
	var temp = initCircuit(circuitData)
	temp.name = circuitData.name;
	return temp;
};
