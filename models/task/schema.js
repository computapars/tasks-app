const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    rotate: {
        type: Boolean,
        default: false,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    house: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'House'
    },
}, {
    timestamps: true,
});

module.exports = { schema }