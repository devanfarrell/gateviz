import { createSelector } from 'reselect';
import { key } from './reducer';

const selectParsedCircuitImmutable = state => state.getIn([key, 'parsedCircuit'], null);
export const selectParsedCircuit = createSelector(
	selectParsedCircuitImmutable,
	circuit => circuit && circuit.toJS()
);
