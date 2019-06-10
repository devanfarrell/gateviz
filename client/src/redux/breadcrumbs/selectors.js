import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { key } from './reducer';

const selectBreadcrumbsImmutable = state => state.getIn([key], fromJS([]));
export const selectBreadcrumbs = createSelector(
	selectBreadcrumbsImmutable,
	crumbs => crumbs.toJS()
);
