const express = require('express');
const { api } = require('./api/controller/api');
const cors = require('cors');
const session = require('express-session');
const uuid = require('uuid');
const app = express();
const initialize = () => {
    app.use(session({
        secret: process.env.JWT_SECRET,
        saveUninitialized: true,
        resave: false,
    }));
    app.use(cors({
        origin: 'http://localhost:5500',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }));
    app.use('/api', api);
    app.listen(8080);
}
initialize();
