const express = require('express');
const bodyParser = require('body-parser');
const { jwt } = require('./modules/auth');
const app = express();

app.use(jwt);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = app;
