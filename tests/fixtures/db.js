
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userOneId = new mongoose.Types.ObjectId();
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

const houseOne = {
    _id: houseOneId,
    name: "Foo House"
};

const setupUserDb = async () => {
    await User.deleteMany();
    await new User(userOne).save();
}

const setupHouseDb = async () => {
    await setupUserDb();
    await House.deleteMany();
}

const setupTaskDb = async () => {

}

module.exports = {
    userOne,
    setupUserDb,
    setupHouseDb,
    setupTaskDb,
    houseOne,
}