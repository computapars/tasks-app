const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const validator = require('validator');

mongoose.connect(`${connectionUrl}/${databaseName}`, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'why no name?'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'You have to provide'],
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
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
    }
});

// model is a class in which we construct doments
const User = mongoose.model('User', userSchema);

const marlene = new User({ 
    name: 'Marlene',
    age: 37,
    email: 'marlenebowls@gmail.com',
    password: 'pass'
});
marlene.save().then(user => {
    console.log(user);
});
