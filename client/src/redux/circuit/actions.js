import { key } from './reducer';
import { generateEnforcedComplexAction } from '../utils';

export const fetchCircuitName = requestType =>
	generateEnforcedComplexAction(key, 'fetchCircuit', requestType);
export const fetchCircuit = (requestType, data) => ({
	type: fetchCircuitName(requestType),
	key,
	payload: data
});
