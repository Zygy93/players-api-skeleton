const express = require('express');
const bodyParser = require('body-parser');
const { jwt } = require('./modules/auth');
const app = express();
const routes = require('./routes/index');

app.use(jwt);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Express JWT defaults to send 401 - send 403 instead
  if (err.name === 'UnauthorizedError') {
    res.status(403).send();
  }
  // Fallback to internal server error
  res.status(err.status || 500).send();
});//We need to figure out how to send a 403 if auth fails, so this is the solution
module.exports = app;
