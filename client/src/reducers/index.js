import { combineReducers } from '../../../../../Library/Caches/typescript/2.9/node_modules/redux';

import circuitReducer from './circuitReducer';

export default combineReducers({
	circuit: circuitReducer
});
