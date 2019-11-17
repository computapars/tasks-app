
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./../../models/user');
const House = require('./../../models/house');
const Task = require('./../../models/task');

const testIds = {
    userOne: new mongoose.Types.ObjectId(),
    userTwo: new mongoose.Types.ObjectId(),
    userThree: new mongoose.Types.ObjectId(),
    houseOne: new mongoose.Types.ObjectId(),
    taskOne: new mongoose.Types.ObjectId(),
    taskTwo: new mongoose.Types.ObjectId(),
}

const userOne = {
    _id: testIds.userOne,
    name: "Foo",
    email: "foo@example.com",
    password: "foofoofoo",
    tokens: [{
        token: jwt.sign({ _id: testIds.userOne}, process.env.JWT_SECRET)
    }]
};

const userTwo = {
    _id: testIds.userTwo,
    name: "Bar",
    email: "bar@example.com",
    password: "barbarbar",
    tokens: [{
        token: jwt.sign({ _id: testIds.userTwo}, process.env.JWT_SECRET)
    }]
};

const userThree = {
    _id: testIds.userThree,
    name: "Bizz",
    email: "bizz@example.com",
    password: "bizzbizzbizz",
    tokens: [{
        token: jwt.sign({ _id: testIds.userThree}, process.env.JWT_SECRET)
    }]
};

const houseOne = {
    _id: testIds.houseOne,
    name: "Foo House",
    members: [{
        ...userOne,
    }]
};

const inviteOne = {
    name: "Bazz",
    email: "bazz@example.com",
    message: "This is an invitation test."
};

const taskOne = {
    description: "Mars Task",
    completed: false,
    rotate: false,
    assignedTo: userOne._id,
};

const taskTwo = {
    description: "Saturn Task",
    completed: false,
    rotate: false,
    assignedTo: userTwo._id,
};

const setupUserDb = async () => {
    await User.deleteMany();
    await new User(userOne).save();
}

const setupHouseDb = async () => {
    await setupUserDb();
    await House.deleteMany();
    await new House(houseOne).save();
}

const setupHouseDbWithUser = async () => {
    await setupUserDb();
    await House.deleteMany();
    const house = await new House(houseOne).save();
    await User.findByIdAndUpdate(userOne._id, {
        house
    });
}

const setupHouseDbWithMultipleUsers = async () => {
    await User.deleteMany();
    await House.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    const house = await new House(houseOne).save();
    await User.findByIdAndUpdate(userOne._id, {
        house
    });
    await User.findByIdAndUpdate(userTwo._id, {
        house
    });
    const members = house.members.concat(userTwo._id, userOne._id);
    await House.findByIdAndUpdate(house._id, {
        members: [...new Set(members)],
    });
}

const setupTaskDb = async () => {
    await Task.deleteMany();
    await setupHouseDbWithMultipleUsers();
}

module.exports = {
    userOne,
    userTwo,
    userThree,
    taskOne,
    taskTwo,
    houseOne,
    inviteOne,
    setupUserDb,
    setupHouseDb,
    setupHouseDbWithUser,
    setupHouseDbWithMultipleUsers,
    setupTaskDb,
}