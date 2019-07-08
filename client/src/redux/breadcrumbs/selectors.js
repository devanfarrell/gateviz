import { createSelector } from 'reselect';
import { key } from './reducer';

export const selectBreadcrumbs = createSelector(
	state => state[key],
	crumbs => crumbs
);
