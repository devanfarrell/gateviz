import axios from 'axios';

export const fetchCircuitList = async () => {
	return await axios.get('/v1/circuits');
};

export const fetchCircuitRequest = async cid => await axios.get(`/v1/circuit/${cid}`);
