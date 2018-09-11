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
	for (i = 0; i < circuit.internalLogic.length; i++) {
		if (circuit.internalLogic[i].id === id) {
			return circuit.internalLogic[i]
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

	tempCircuit.internalLogic = [];
	for (i = 0; i < circuitData.internalLogic.length; i++) {
		tempCircuit.internalLogic[i] = circuitData.internalLogic[i];

		if (tempCircuit.internalLogic[i].type !== 'CIRCUIT') {
			//TODO:default state should also be definable for dependant logic
			tempCircuit.internalLogic[i].output = false;
		} else {
			tempCircuit.internalLogic[i].output = [];
			for (var j = 0; j < circuitData.output.length; j++) {
				tempCircuit.internalLogic[i].output[j] = {};
				tempCircuit.internalLogic[i].output[j].output = false;
			}
		}

		if (circuitData.internalLogic[i].hasOwnProperty('axis')) {
			if (Array.isArray(circuitData.internalLogic[i].axis)) {
				if (circuitData.internalLogic[i].axis.length === circuitData.internalLogic[i].input.length) {
					tempCircuit.internalLogic[i].axis = circuitData.internalLogic[i].axis;
				} else {
					// axis is an array but not of the correct length
					tempCircuit.internalLogic[i].axis = circuitData.internalLogic[i].axis;
					for (j = tempCircuit.internalLogic[i].axis.length; j < circuitData.internalLogic[i].input.length; j++) {
						tempCircuit.internalLogic[i].axis.push(DEFAULT_AXIS);
					}
				}
			} else {
				// axis exists but isn't an array
				const carriedPivotPoint = circuitData.internalLogic[i].axis;
				tempCircuit.internalLogic[i].axis = [];
				tempCircuit.internalLogic[i].axis[0] = carriedPivotPoint;
				for (j = 1; j < circuitData.internalLogic[i].input.length; j++) {
					tempCircuit.internalLogic[i].axis.push(DEFAULT_AXIS);
				}
			}

		} else {
			tempCircuit.internalLogic[i].axis = [];
			for (j = 0; j < circuitData.internalLogic[i].input.length; j++) {
				tempCircuit.internalLogic[i].axis.push(DEFAULT_AXIS);
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
	//deserialize internalLogic
	for (var i = 0; i < circuit.internalLogic.length; i++) {
		//get reference for each input

		for (var j = 0; j < circuit.internalLogic[i].input.length; j++) {
			// the input ID
			var input = circuit.internalLogic[i].input[j];
			var parsedInputID = '';
			// if the gate's input is a component or a bus the output will need to be selected
			var divider = input.indexOf(':');
			if (divider === -1) {
				parsedInputID = input;
				circuit.internalLogic[i].input[j] = {};
				circuit.internalLogic[i].input[j].pin = null;
			} else {
				parsedInputID = input.substring(0, divider);
				// get the string version of input pin and convert to digit
				circuit.internalLogic[i].input[j] = {};
				circuit.internalLogic[i].input[j].pin = parseInt(
					input.substring(divider + 1, input.length),
					10
				);
			}
			circuit.internalLogic[i].input[j].ref = getRef(circuit, parsedInputID);
		}
		var evaluationMethod = () => { };
		switch (circuit.internalLogic[i].type) {
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
				circuit.internalLogic[i].cid = circuit.internalLogic[i].circuit.cid;
				circuit.internalLogic[i].name = circuit.internalLogic[i].circuit.name;
				circuit.internalLogic[i].description = circuit.internalLogic[i].circuit.description;
				circuit.internalLogic[i].path = circuit.internalLogic[i].circuit.path;
				circuit.internalLogic[i].height = circuit.internalLogic[i].circuit.height;
				circuit.internalLogic[i].width = circuit.internalLogic[i].circuit.width;
				circuit.internalLogic[i].circuit = initCircuit(circuit.internalLogic[i].circuit);
				solderOutputPins(circuit.internalLogic[i], circuit.internalLogic[i].circuit);
				solderInputPins(circuit.internalLogic[i], circuit.internalLogic[i].circuit);
				evaluationMethod = () => console.log('evaluate called on a circuit, type must be declared in uppercase: CIRCUIT');
				break;
			default:
				console.log('something has done broke');
		}
		circuit.internalLogic[i].evaluate = evaluationMethod;
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
