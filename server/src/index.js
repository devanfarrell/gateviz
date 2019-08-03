import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './api/index';

require('dotenv').config();

const app = express();
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.use(
	cors({
		origin: 'http://www.gateviz.com'
	})
);

api(app);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
