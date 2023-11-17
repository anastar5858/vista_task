const express = require('express');
const { api } = require('./api/controller/userAuth');
const cors = require('cors');

const app = express();

const initialize = () => {
    app.use('/api', cors({
        origin: 'http://localhost:5500',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }));
    app.use('/api', api);
    app.listen(8080);
}

initialize();
