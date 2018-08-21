import { combineReducers } from 'redux';

import circuitEvaluationReducer from './circuitEvaluationReducer';
import listCircuitsReducer from './listCircuitsReducer';
import searchTermChangeReducer from './searchTermChangeReducer';
import selectCircuitReducer from './selectCircuitReducer';
import breadCrumbReducer from './breadcrumbReducer';

export default combineReducers({
	circuit: 			circuitEvaluationReducer,
	circuitList: 		listCircuitsReducer,
	selectedCircuit: 	selectCircuitReducer,
	term: 				searchTermChangeReducer,
	breadCrumb: 		breadCrumbReducer
});
