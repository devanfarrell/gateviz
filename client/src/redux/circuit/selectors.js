import { createSelector } from 'reselect';
import { key } from './reducer';

export const selectCircuit = createSelector(
	state => state[key],
	data => data || null
);

export const selectInputs = createSelector(
	[selectCircuit],
	circuit => (circuit && circuit.input) || null
);

export const selectoutput = createSelector(
	[selectCircuit],
	circuit => (circuit && circuit.output) || null
);

export const selectAutoEvaluate = createSelector(
	[selectCircuit],
	circuit => (circuit && circuit.autoEvaluate) || null
);

export const selectTopLevelCircuitDiscriptors = createSelector(
	[selectCircuit],
	circuit => (circuit && { name: circuit.name, description: circuit.description }) || {}
);
