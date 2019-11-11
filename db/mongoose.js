const mongoose = require('mongoose');
const mongoDbUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_NAME

console.log(`${mongoDbUri}/${mongoDbName}`)
mongoose.connect(`${mongoDbUri}/${mongoDbName}`, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

module.exports = db;