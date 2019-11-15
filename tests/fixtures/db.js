
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const userThreeId = new mongoose.Types.ObjectId();
const houseOneId = new mongoose.Types.ObjectId();

const User = require('./../../models/user');
const House = require('./../../models/house');

const userOne = {
    _id: userOneId,
    name: "Foo",
    email: "foo@example.com",
    password: "foofoofoo",
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
    }]
};

const userTwo = {
    _id: userTwoId,
    name: "Bar",
    email: "bar@example.com",
    password: "barbarbar",
    tokens: [{
        token: jwt.sign({ _id: userTwoId}, process.env.JWT_SECRET)
    }]
};

const userThree = {
    _id: userThreeId,
    name: "Bizz",
    email: "bizz@example.com",
    password: "bizzbizzbizz",
    tokens: [{
        token: jwt.sign({ _id: userThreeId}, process.env.JWT_SECRET)
    }]
};

const houseOne = {
    _id: houseOneId,
    name: "Foo House",
    members: [{
        ...userOne,
    }]
};

const inviteOne = {
    name: "Cats",
    email: "cats@example.com",
    message: "This is a test"
};


const setupUserDb = async (options = {
    user: userOne,
}) => {
    await User.deleteMany();
    await new User(options.user).save();
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
    })
}

const setupHouseDbWithMultipleUsers = async () => {
    await User.deleteMany();
    await House.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    const house = await new House(houseOne).save();
    await User.findByIdAndUpdate(userOne._id, {
        house
    })
    await User.findByIdAndUpdate(userTwo._id, {
        house
    });
    await House.findByIdAndUpdate(house._id, {
        members: house.members.concat(userTwo._id, userOne._id)
    })
}

const setupTaskDb = async () => {

}

module.exports = {
    userOne,
    userTwo,
    userThree,
    setupUserDb,
    setupHouseDb,
    setupHouseDbWithUser,
    setupHouseDbWithMultipleUsers,
    setupTaskDb,
    houseOne,
    inviteOne,
}