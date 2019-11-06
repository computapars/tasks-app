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

schema.statics.isValidUser = async (User, assignedTo, house) => {
    // todo, can i just pass in theuser model through req.user?
    const isValidUser = await User.findOne({
        _id: assignedTo,
        house: house,
    });
    if (!isValidUser){
        return false;
    }
    return isValidUser;
};

schema.statics.getNextHouseMember = async (assignedTo, house) => {
    
};

module.exports = { schema }