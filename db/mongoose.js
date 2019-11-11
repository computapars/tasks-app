const mongoose = require('mongoose');
const mongoDbUri = proces.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_NAME

mongoose.connect(`${mongoDbUri}/${mongoDbName}`, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;