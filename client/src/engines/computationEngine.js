export const evaluateCircuit = circuit => {
	circuit.input.map(input => {
		if (!(input.pin === null || input.pin === undefined)) {
			input.output = input.ref.output[input.pin];
		} else if (!!input.ref) {
			input.output = input.ref.output;
		}
	});

	circuit.parts.map(part => {
		if (part.type !== 'CIRCUIT') {
			let inputValues = [];
			part.input.map(input => {
				if (input.pin === null) {
					inputValues.push(input.ref.output);
				} else {
					inputValues.push(input.ref.output[input.pin].output);
				}
			});
			part.output = part.evaluate(inputValues);
		} else {
			evaluateCircuit(part.circuit);
		}
	});

	circuit.output.map(output => {
		const pin = output.input.pin;
		// if there is no selected output pin for this particular input
		if (pin === null) {
			output.output = output.input.ref.output;
		} else {
			output.output = output.input.ref.output[pin].output;
		}
	});
};
