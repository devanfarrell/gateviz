const AND = input => {
	// TODO: Error handling if there is no input
	let counter = 0;
	for (let i = 0; i < input.length; i++) {
		if (input[i]) {
			counter++;
		}
	}
	return counter > 0 && counter === input.length;
};

const NAND = input => {
	// TODO: Error handling if there is no input
	let counter = 0;
	for (let i = 0; i < input.length; i++) {
		if (input[i]) {
			counter++;
		}
	}
	return !(counter > 0 && counter === input.length);
};

const OR = input => {
	// TODO: Error handling if there is no input
	for (let i = 0; i < input.length; i++) {
		if (input[i]) {
			return true;
		}
	}
	return false;
};

const NOR = input => {
	// TODO: Error handling if there is no input
	for (let i = 0; i < input.length; i++) {
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

const getEvaluationMethod = type => {
	switch (type) {
		case 'AND':
			return AND;
		case 'NAND':
			return NAND;
		case 'OR':
			return OR;
		case 'NOR':
			return NOR;
		case 'XOR':
			return XOR;
		case 'NOT':
			return NOT;
		default:
			console.error('Something is broken in the evualuation types', type);
	}
};

export default getEvaluationMethod;
