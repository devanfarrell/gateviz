"use strict";
exports.__esModule = true;
var module_1 = require();
'express';
var body_parser_1 = require("body-parser");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
var router = module_1.express.Router();
var PORT = 5000;
var app = module_1.express();
app.use(body_parser_1["default"].urlencoded({
    extended: true
}));
app.use(body_parser_1["default"].json());
require('./api')(app, router);
if (process.env.NODE_ENV === 'production') {
    app.use(module_1.express.static('client/build'));
    var path_1 = require('path');
    app.get('*', function (req, res) {
        res.sendFile(path_1.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(PORT);
