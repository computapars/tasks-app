const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


mongoose.connect(`${connectionUrl}/${databaseName}`, {
    useNewUrlParser:true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('we connected')
});

module.exports = db;