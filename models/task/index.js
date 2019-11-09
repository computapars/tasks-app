const mongoose = require('mongoose');
const { schema } = require('./schema');

schema.statics.isValidUser = async (User, assignedTo, house) => {
    // todo, can i just pass in the user model through req.user?
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
    
    const currIndex = house.members.indexOf(assignedTo);
    if (matchingHouse.members.length >= 1){
        // negative indexes in javascript don't work, https://medium.com/uncaught-exception/javascript-array-negative-index-using-proxies-ed096dc84416
        console.log(currIndex - 1)
        console.log(matchingHouse.members[currIndex])
        // if its the last item in the array go the beginning, otherwsie do the nxt
        return matchingHouse.members[currIndex - 1]._id;
    }
    return assignedTo;
};

const Task = mongoose.model('Task', schema)
module.exports = Task;
