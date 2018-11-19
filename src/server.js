const express = require('express');
const bodyParser = require('body-parser');
const { jwt } = require('./modules/auth');
const app = express();
const routes = require('./routes/index');

app.use(jwt);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;
