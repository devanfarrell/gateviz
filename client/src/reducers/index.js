import { combineReducers } from 'redux';

import circuitEvaluationReducer from './circuitEvaluationReducer';
import listCircuitsReducer from './listCircuitsReducer';
import searchTermChangeReducer from './searchTermChangeReducer';
import selectCircuitReducer from './selectCircuitReducer';
import displayedCircuit from './displayCircuitReducer';

export default combineReducers({
	circuit: 			circuitEvaluationReducer,
	circuitList: 		listCircuitsReducer,
	displayedCircuit:	displayedCircuit,
	selectedCircuit: 	selectCircuitReducer,
	term: 				searchTermChangeReducer
});
