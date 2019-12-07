const evaluateCircuit = circuit => {
	circuit.input.forEach(input => {
		// Only evaluate inputs if it's a nested circuit
		if (input.ref) {
			if (input.type === 'SINGLE_INPUT') {
				// CASE 1 ALL - SINGLE_INPUT
				if (input.ref.type === 'CIRCUIT') {
					// CASE 1.1 CIRCUIT - SINGLE_INPUT
					if (input.pin == null) {
						// CASE 1.1.1 CIRCUIT w/ single output - SINGLE_INPUT
						input.state = input.ref.output[0].state;
					} else if (input.ref.output[input.pin].type === 'SINGLE_OUTPUT') {
						// CASE 1.1.2 CIRCUIT w/ multiple outputs - SINGLE_INPUT
						input.state = input.ref.output[input.pin].state;
					} else {
						// CASE 1.1.3 CIRCUIT w/ bus output - SINGLE_INPUT
						console.warn(`input from bus output hasn't been implemented yet`);
					}
				} else {
					// CASE 1.2 - SINGLE_INPUT
					if (input.pin == null) {
						// CASE 1.2.1 Simple - SINGLE_INPUT
						input.state = input.ref.state;
					} else {
						// CASE 1.2.1 MULTIPLE_INPUT - SINGLE_INPUT
						input.state = input.ref.state[input.pin];
					}
				}
			} else {
				// CASE 2 ALL - MULTIPLE_INPUT
				if (input.ref.type === 'MULTIPLE_INPUT') {
					// CASE 2.1 MULTIPLE_INPUT - MULTIPLE_INPUT
					input.state = input.state.map((notUsed, index) => {
						return input.ref.state[index + input.pin];
					});
				} else {
					// CASE 2 ALL - MULTIPLE_INPUT
					console.warn('Still gotta implement this one');
				}
			}
		}
	});

	circuit.parts.forEach(part => {
		if (part.type !== 'CIRCUIT') {
			const inputValues = part.input.map(input => {
				if (input.pin === null) {
					return input.ref.state;
				} else {
					if (input.ref.type !== 'CIRCUIT') {
						return input.ref.state[input.pin];
					} else {
						return input.ref.output[input.pin].state;
					}
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
