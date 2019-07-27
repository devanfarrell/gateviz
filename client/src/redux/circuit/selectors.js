import { createSelector } from 'reselect';
import { key } from './reducer';

const selectCircuit = createSelector(
	state => state[key],
	data => data || {}
);

export const selectParsedCircuit = createSelector(
	selectCircuit,
	circuit => (circuit && circuit.parsedCircuit) || null
);

export const selectInputs = createSelector(
	[selectParsedCircuit],
	circuit => (circuit && circuit.input) || null
);

export const selectAutoEvaluate = createSelector(
	selectCircuit,
	circuit => (circuit && circuit.autoEvaluate) || null
);
