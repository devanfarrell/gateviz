import axios from 'axios';

export const fetchCircuitList = async () => {
	return await axios.get('/v1/circuits');
};
