export function evaluateCircuit(circuit) {

	//handle internal circuits
	for (var i = 0; i < circuit.input.length; i++) {
		if (circuit.input[i].hasOwnProperty('ref')) {
			circuit.input[i].output = circuit.input[i].ref.output;
		}
	}

	for (i = 0; i < circuit.internalLogic.length; i++) {
		if (circuit.internalLogic[i].type !== 'CIRCUIT') {
			var inputValues = [];
			for (var j = 0; j < circuit.internalLogic[i].input.length; j++) {
				var pin = circuit.internalLogic[i].input[j].pin;
				if (pin === null) {
					inputValues[j] = circuit.internalLogic[i].input[j].ref.output;
				} else {
					//busses and circuits as input
					inputValues[j] = circuit.internalLogic[i].input[j].output[pin].output;
				}
			}
			circuit.internalLogic[i].output = circuit.internalLogic[i].evaluate(inputValues);
		} else {
			evaluateCircuit(circuit.internalLogic[i].circuit)
		}
	}
	// evauate outputs
	for (i = 0; i < circuit.output.length; i++) {
		pin = circuit.output[i].input.pin;
		// if there is no selected output pin for this particular input
		if (pin === null) {
			circuit.output[i].output = circuit.output[i].input.ref.output;
		} else {
			circuit.output[i].output = circuit.output[i].input.ref.output[pin].output;
		}
	}
}
