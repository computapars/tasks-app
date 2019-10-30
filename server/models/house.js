const mongoose = require('mongoose');
const Task = './task';

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'why no name?'],
        trim: true,
        unique: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }]
});


houseSchema.pre('remove', async function (next) {
    await Task.deleteMany({
        owner: this._id,
    })
    next();
});

const House = mongoose.model('House', houseSchema);
module.exports = House;
