import axios from 'axios';

export const fetchCircuitList = async () => {
	return await axios.get('/v1/circuit_list');
};

export const fetchCircuitRequest = async cid => await axios.get(`/v1/circuit/${cid}`);
