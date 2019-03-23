const AND = input => {
	for (let i = 0; i < input.length; i++) {
		if (!input[i]) {
			return false;
		}
	}
	return true;
};

const NAND = input => {
	return !AND(input);
};

const OR = input => {
	for (let i = 0; i < input.length; i++) {
		if (input[i]) {
			return true;
		}
	}
	return false;
};

const NOR = input => {
	return !OR(input);
};

const NOT = input => {
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
