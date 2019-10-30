const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'why no name?'],
        trim: true,
    },
    email: {
        minlength: 1,
        unique: true,
        type: String,
        required: [true, 'You have to provide'],
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0) {
                throw new Error('Age must be positive')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.includes('password')){
                throw new Error('Can\'t use the word password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
    house: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House',
    }
});


userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.pre('remove', async function (next) {
    await Task.deleteMany({
        assignedTo: this._id,
    })
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
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
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({
        _id: this._id.toString(),
    }, 'somesignature');
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
}

// Overrides the method that is called whenever the user object is stringified (sent)
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.tokens;
    delete userObject.password;
    return userObject;
}


const User = mongoose.model('User', userSchema);
module.exports = User;
