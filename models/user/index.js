const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./../task')
const { schema } = require('./schema');

schema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

schema.pre('remove', async function (next) {
    await Task.deleteMany({
        assignedTo: this._id,
    })
    next();
});

schema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user){
        throw new Error ('Unable to login')
    }
    const isMatching = await bcrypt.compare(password, user.password)
    if (!isMatching) {
        throw new Error ('Unable to login');
    }
    
    return user;
}

// instance methods shouldn't use arrow functions
schema.methods.generateAuthToken = async function () {
    const token = jwt.sign({
        _id: this._id.toString(),
    }, 'somesignature');
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
}

// Overrides the method that is called whenever the user object is stringified (sent)
schema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.tokens;
    delete userObject.password;
    return userObject;
}


const User = mongoose.model('User', schema);

module.exports = User;
