module.exports = app => {
	app.get(
		'/api/circuit/test',
		(res, req) => {
			res.send('Reached test route');
		}
	);
};
