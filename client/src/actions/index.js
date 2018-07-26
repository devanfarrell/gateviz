import axios from 'axios';

import { FETCH_CIRCUIT } from './types';

export const fetchCircuit = () => async dispatch => {
	const res = await axios.get('/api/circuit/test');
	dispatch({ type: FETCH_CIRCUIT, payload: res.data });
}; 