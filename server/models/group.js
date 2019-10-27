const mongoose = require('mongoose');
const validator = require('validator');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'why no name?'],
        trim: true,
    },
    members: {
        type: Relation,
        required: true,
        trim: true,
    }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
