import { combineReducers } from 'redux';

import circuitReducer from './circuitReducer';
import circuitListReducer from './circuitListReducer';
import searchTermReducer from './searchTermReducer';
import selectCircuitReducer from './selectCircuitReducer';
import breadcrumbReducer from './breadcrumbReducer';

export default combineReducers({
	circuit: 			circuitReducer,
	circuitList: 		circuitListReducer,
	selectedCircuit: 	selectCircuitReducer,
	term: 				searchTermReducer,
	breadcrumbs: 		breadcrumbReducer
});
