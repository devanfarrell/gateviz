export const circuit_v1 = app => {
	app.get('/v1/circuit/*', (req, res) => {
		require('url').parse(req.url);
		const str = req.url;
		const circuitRequested = str.replace('/v1/circuit/', '');
		try {
			res.send(require(`../circuits_v1/${circuitRequested}.json`));
		} catch (e) {
			res.send(404);
		}
	});
};
