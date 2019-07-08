import { createSelector } from 'reselect';
import { key } from './reducer';

export const selectCircuitList = createSelector(
	state => state[key],
	list => list || []
);
