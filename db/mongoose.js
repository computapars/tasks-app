const mongoose = require('mongoose');
const mongoDbUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_NAME


mongoose.connect(`${mongoDbUri}/${mongoDbName}`, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

module.exports = db;