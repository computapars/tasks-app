
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
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


const setupUserDb = async () => {
    await User.deleteMany();
    const user = await new User(userOne).save();
}

const setupHouseDb = async () => {
    await setupUserDb();
    await House.deleteMany();
    const house = await new House(houseOne).save();
    await User.findByIdAndUpdate(userOne._id, {
        house
    })
}


const setupTaskDb = async () => {

}

module.exports = {
    userOne,
    setupUserDb,
    setupHouseDb,
    setupTaskDb,
    houseOne,
    inviteOne,
}