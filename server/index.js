const express = require('express');
// const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('app is running')
});