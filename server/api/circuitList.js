import circuitList from '../data/circuitList.json';

export const circuitList_v1 = app => {
	app.get('/v1/circuit_list', (req, res) => {
		res.send(circuitList);
	});
};
