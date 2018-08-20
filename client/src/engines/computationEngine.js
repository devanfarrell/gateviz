export function evaluateCircuit(circuit) {

	//handle internal circuits
	for(var i = 0; i < circuit.input.length; i++) {
		if(circuit.input[i].hasOwnProperty('ref')) {
			circuit.input[i].output=circuit.input[i].ref.output;
		}
	}

	for (i = 0; i < circuit.internalLogic.length; i++) {
		if (circuit.internalLogic[i].type !== 'CIRCUIT') {
			var inputValues = [];
			for (var j = 0; j < circuit.internalLogic[i].input.length; j++) {
				var pin = circuit.internalLogic[i].input[j].pin;
				// if there is no selected output pin for this particular input
				if (pin === null) {
					inputValues[j] = circuit.internalLogic[i].input[j].ref.output;
				} else {
					inputValues[j] = circuit.internalLogic[i].input[j].ref.output[pin].output;
				}
			}
			circuit.internalLogic[i].evaluate(inputValues);
		} else {
			// I just need to assign the inputs of the circuit then I should just be able to make a recursive call on the deeper circuit
			for(j = 0; j < circuit.internalLogic[i].input.length; j++) {
				pin = circuit.internalLogic[i].input[j].pin;
				// if there is no selected output pin for this particular input
				if (pin === null) {
					circuit.internalLogic[i].input[j].output = circuit.internalLogic[i].input[j].ref.output;
				} else {
					circuit.internalLogic[i].input[j].output = circuit.internalLogic[i].input[j].ref.output[pin].output;
				}
			}
			evaluateCircuit(circuit.internalLogic[i].circuit)
			//console.log('Circuit evaluations commented out for later testing');
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
