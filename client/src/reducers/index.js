import { combineReducers } from 'redux';

import circuitReducer from './circuitReducer';
import listCircuitsReducer from './listCircuitsReducer';
import searchTermChangeReducer from './searchTermChangeReducer';

export default combineReducers({
	circuit: 		circuitReducer,
	circuitList: 	listCircuitsReducer,
	term: 			searchTermChangeReducer
});
