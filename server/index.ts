import express = require('express');
import bodyParser = require('body-parser');
import openapi from 'express-openapi';
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');


const PORT = 5000;

const app:express.Express = express();
const router = express.Router()
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.urlencoded({
	extended: true
  }));
  app.use(bodyParser.json());
  
app.use(require('./api'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	const path = require('path');

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT);