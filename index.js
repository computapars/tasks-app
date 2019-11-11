const express = require('express');
const app = express();
const PORT = process.env.PORT;
const api = require('./api');

// Runs mongoose db
require('./db/mongoose');

// api routes v1
app.use(api());

app.listen(PORT, () => {
    console.log('app is running')
});


module.exports = app