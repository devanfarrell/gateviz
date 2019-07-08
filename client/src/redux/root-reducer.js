import { combineReducers } from 'redux';
import breadcrumbReducer, { key as breadcrumbKey } from './breadcrumbs/reducer';
import circuitListReducer, { key as circuitListKey } from './circuitlist/reducer';
import circuitReducer, { key as circuitKey } from './circuit/reducer';
export default combineReducers({
	[breadcrumbKey]: breadcrumbReducer,
	[circuitListKey]: circuitListReducer,
	[circuitKey]: circuitReducer
});
