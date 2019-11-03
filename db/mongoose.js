const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongoose.connect(`${connectionUrl}/${databaseName}`, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;