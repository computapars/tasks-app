const mongoose = require('mongoose');
const Task = './../task';
const { schema } = require('./schema');


schema.pre('remove', async function (next) {
    await Task.deleteMany({
        owner: this._id,
    })
    next();
});

const House = mongoose.model('House', schema);
module.exports = House;
