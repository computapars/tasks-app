const express = require('express');
const app = express();
const api = require('./api');

// Runs mongoose db
require('./db/mongoose');

// api routes v1
app.use(api());

module.exports = app