import { createSelector } from 'reselect';
import { key } from './reducer';

const selectCircuit = createSelector(
	state => state[key],
	data => data || null
);

export const selectParsedCircuit = createSelector(
	selectCircuit,
	circuit => (circuit && circuit.parsedCircuit) || null
);

const selectCircuitReponse = createSelector(
	selectCircuit,
	circuit => (circuit && circuit.response) || null
);

export const selectInputs = createSelector(
	[selectParsedCircuit],
	circuit => (circuit && circuit.input) || null
);

export const selectoutput = createSelector(
	[selectParsedCircuit],
	circuit => (circuit && circuit.output) || null
);

export const selectAutoEvaluate = createSelector(
	selectCircuit,
	circuit => (circuit && circuit.autoEvaluate) || null
);

export const selectTopLevelCircuitDiscriptors = createSelector(
	selectCircuitReponse,
	reponse => ({ name: reponse.name, description: reponse.description })
);
