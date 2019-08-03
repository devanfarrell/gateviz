const evaluateCircuit = circuit => {
	circuit.input.forEach(input => {
		if (!(input.pin === null || input.pin === undefined)) {
			input.state = input.ref.state[input.pin];
		} else if (!!input.ref) {
			input.state = input.ref.state;
		}
	});

	circuit.parts.forEach(part => {
		if (part.type !== 'CIRCUIT') {
			const inputValues = part.input.map(input => {
				if (input.pin === null) {
					return input.ref.state;
				} else {
					return input.ref.state[input.pin];
				}
			});
			part.state = part.evaluate(inputValues);
		} else {
			evaluateCircuit(part.circuit);
		}
	});

	circuit.output.forEach(output => {
		const pin = output.input.pin;
		// if there is no selected output pin for this particular input
		if (pin === null) {
			output.state = output.input.ref.state;
		} else {
			output.state = output.input.ref.output[pin].state;
		}
    });
};

export default evaluateCircuit;
