import express from 'express';

module.exports = (app:express.Express) => {
        require('./v0')(app);
        app.use(require('./v1'));
}