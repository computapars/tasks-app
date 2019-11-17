const path = require('path');
const express = require('express');
const app = express();
const api = require('./server/api');

// Runs mongoose db
require('./server/db/mongoose');

// api routes v1
app.use('/api', api());

// client file serving
app.use(express.static(path.join(__dirname, 'client', 'build')));


// client side catchall routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

module.exports = app