import { combineReducers } from 'redux';

import breadcrumbReducer from './breadcrumbReducer';
import circuitListReducer from './circuitListReducer';
import circuitReducer from './circuitReducer';
import searchTermReducer from './searchTermReducer';
import selectCircuitReducer from './selectCircuitReducer';

export default combineReducers({
	breadcrumbs: 		breadcrumbReducer,
	circuit: 			circuitReducer,
	circuitList: 		circuitListReducer,
	selectedCircuit: 	selectCircuitReducer,
	term: 				searchTermReducer,
});
