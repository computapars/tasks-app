const mongoose = require('mongoose');
const mongoDbUrl = process.env.MONGODB_URL;

mongoose.connect(`${mongoDbUrl}`, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

module.exports = db;