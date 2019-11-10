const mongoose = require('mongoose');
const { schema } = require('./schema');

schema.statics.isValidUser = async (User, assignedTo, house) => {
    const isValidUser = await User.findOne({
        _id: assignedTo,
        house: house,
    });
    if (!isValidUser){
        return false;
    }
    return isValidUser;
};

schema.statics.getNextHouseMember = async (House, assignedTo, house) => {
    const matchingHouse = await House.findOne({
        _id: house._id,
    }).populate({
        path: 'members',
    });
    
    if (matchingHouse.members.length >= 1){
        const currIndex = house.members.indexOf(assignedTo);
        const nextIndexOrFirst = (currIndex + 1) % house.members.length;
        return matchingHouse.members[nextIndexOrFirst]._id;
    }
    return assignedTo;
};

const Task = mongoose.model('Task', schema)
module.exports = Task;
