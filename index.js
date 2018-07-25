const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

require('./routes/components')(app);

// React handling
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}