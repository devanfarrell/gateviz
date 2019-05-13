import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { key } from './reducer';

const selectCircuitListImmutable = state => state.getIn([key], fromJS([]));
export const selectCircuitList = createSelector(
	selectCircuitListImmutable,
	list => list && list.toJS()
);
