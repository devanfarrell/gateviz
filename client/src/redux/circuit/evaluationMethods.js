const AND = state => {
	for (let i = 0; i < state.length; i++) {
		if (!state[i]) {
			return false;
		}
	}
	return true;
};

const NAND = state => {
	return !AND(state);
};

const OR = state => {
	for (let i = 0; i < state.length; i++) {
		if (state[i]) {
			return true;
		}
	}
	return false;
};

const NOR = state => {
	return !OR(state);
};

const NOT = state => {
	return !state;
};

const XOR = state => {
	// TODO: Error handling if there is not exactly 2 inputs
	return state[0] !== state[1];
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
