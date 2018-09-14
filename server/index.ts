import express from 'express';
import bodyParser from 'body-parser';
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const router = express.Router();
const PORT = 5000;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
require('./api')(app, router);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT);