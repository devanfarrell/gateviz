const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/v1/*', { target: 'http://localhost:5000/' }));
  app.use(proxy('/v1/circuits', { target: 'http://localhost:5000/' }));
  app.use(proxy('/v1/circuit/*', { target: 'http://localhost:5000/' }));
};