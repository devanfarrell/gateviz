const circuitExample = require('../circuit-data/circuitjsonconcept.json');

module.exports = app => {
	app.get(
		'/api/circuit/test',
		(req, res) => {
			res.send(circuitExample);
		}
	);
};
