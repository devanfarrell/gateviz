import { combineReducers } from 'redux';

import circuitReducer from './circuitReducer';
import listCircuitsReducer from './listCircuitsReducer';
import searchTermChangeReducer from './searchTermChangeReducer';
import selectCircuitReducer from './selectCircuitReducer';
import displayedCircuit from './displayCircuitReducer';

export default combineReducers({
	circuit: 			circuitReducer,
	circuitList: 		listCircuitsReducer,
	term: 				searchTermChangeReducer,
	selectedCircuit: 	selectCircuitReducer,
	displayedCircuit:	displayedCircuit,
});
