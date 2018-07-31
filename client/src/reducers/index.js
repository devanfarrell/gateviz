import { combineReducers } from 'redux';

import fetchCircuitReducer from './fetchCircuitReducer';
import listCircuitsReducer from './listCircuitsReducer';
import searchTermChangeReducer from './searchTermChangeReducer';
import selectCircuitReducer from './selectCircuitReducer';

export default combineReducers({
	circuit: 			fetchCircuitReducer,
	circuitList: 		listCircuitsReducer,
	term: 				searchTermChangeReducer,
	selectedCircuit: 	selectCircuitReducer
});
