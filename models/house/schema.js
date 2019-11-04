const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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

module.exports = { schema }