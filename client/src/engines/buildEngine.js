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
			return circuit.internalLogic[i];
		}
	}

	console.log('something has gone terribly awry');
}

function deserializeCircuit(circuit) {
	//deserialize internalLogic
	for (var i = 0; i < circuit.internalLogic.length; i++) {
		if (circuit.internalLogic[i].type !== 'circuit') {
			//get reference for each input of the gate
			var evaluationMethod = () => {};
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
				default:
					console.log('manditory default case hit... somehow...');
			}
			circuit.internalLogic[i].evaluate = evaluationMethod;
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
					// get the string versin of input pin and convert to digit
					circuit.internalLogic[i].input[j] = {};
					circuit.internalLogic[i].input[j].pin = parseInt(
						input.substring(divider + 1, input.length),
						10
					);
				}
				circuit.internalLogic[i].input[j].ref = getRef(circuit, parsedInputID);
			}
		} else {
			// get reference for each input of the circuit
			for (j = 0; j < circuit.internalLogic[i].input.length; j++) {
				// TODO
			}
		}
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
	var tempCircuit = {};
	//build step
	tempCircuit.input = [];
	for (var i = 0; i < circuitData.input.length; i++) {
		tempCircuit.input[i] = circuitData.input[i];
		tempCircuit.input[i].output = false;
	}

	tempCircuit.internalLogic = [];
	for (i = 0; i < circuitData.internalLogic.length; i++) {
		tempCircuit.internalLogic[i] = circuitData.internalLogic[i];

		if (tempCircuit.internalLogic[i].type !== 'circuit') {
			//TODO:default state should also be definable for dependant logic
			tempCircuit.internalLogic[i].output = false;
		}
	}

	tempCircuit.output = [];
	
	for (i = 0; i < circuitData.output.length; i++) {
		tempCircuit.output[i] = circuitData.output[i];
		// yes the naming is stupid but... naming convention
		tempCircuit.output[i].output = false;
	}
	deserializeCircuit(tempCircuit);
	return tempCircuit;
};
