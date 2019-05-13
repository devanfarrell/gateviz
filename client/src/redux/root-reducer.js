import { combineReducers } from 'redux-immutable';
import breadcrumbReducer, { key as breadcrumbKey } from './breadcrumbs/reducer';
import circuitListReducer, { key as circuitListKey } from './circuitlist/reducer';

export default combineReducers({
	[breadcrumbKey]: breadcrumbReducer,
	[circuitListKey]: circuitListReducer
});
