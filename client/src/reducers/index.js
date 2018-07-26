import { combineReducers } from 'redux';

import circuitReducer from './circuitReducer';

export default combineReducers({
	circuit: circuitReducer
});
