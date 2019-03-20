export const evaluateCircuit = circuit => {
	for (let i = 0; i < circuit.input.length; i++) {
		const pin = circuit.input[i].pin;
		// if there is no selected output pin for this particular input
		if (!(pin === null || pin === undefined)) {			
			circuit.input[i].output = circuit.input[i].ref.output[pin];
		} else if (circuit.input[i].hasOwnProperty('ref')){
			circuit.input[i].output = circuit.input[i].ref.output;
		}
	}

	for (let i = 0; i < circuit.parts.length; i++) {
		if (circuit.parts[i].type !== 'CIRCUIT') {
			let inputValues = [];
			for (let j = 0; j < circuit.parts[i].input.length; j++) {
				const pin = circuit.parts[i].input[j].pin;
				if (pin === null) {
					inputValues[j] = circuit.parts[i].input[j].ref.output;
				} else {
					//busses and circuits as input
					inputValues[j] = circuit.parts[i].input[j].output[pin].output;
				}
			}

			circuit.parts[i].output = circuit.parts[i].evaluate(inputValues);
		} else {
			evaluateCircuit(circuit.parts[i].circuit);
		}
	}
	// evauate outputs
	for (let i = 0; i < circuit.output.length; i++) {
		const pin = circuit.output[i].input.pin;
		// if there is no selected output pin for this particular input
		if (pin === null) {
			circuit.output[i].output = circuit.output[i].input.ref.output;
		} else {
			circuit.output[i].output = circuit.output[i].input.ref.output[pin].output;
		}
	}
};
