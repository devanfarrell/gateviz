const circuitExample = require('../circuit-data/vq8ev7ga.json');
const circuitList = require('../circuit-data/list.json');



module.exports = app => {
	app.get(
		'/api/circuit/test',
		(req, res) => {
			res.send("circuitExample");
		}
	);

	app.get(
		'/api/circuit_list',
		(req, res) => {
			res.send(circuitList);
		}
	);
};