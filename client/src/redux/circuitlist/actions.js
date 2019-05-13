import { generateEnforcedComplexAction } from 'redux/utils';
import { key } from './reducer';

export const initializeName = requestType =>
	generateEnforcedComplexAction(key, 'initialize', requestType);

export const initialize = (requestType, data) => ({
	type: initializeName(requestType),
	payload: data
});
