// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser:true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log('we connected')
// });

// // schema
// const kittySchema = new mongoose.Schema({
//     name: String,
// });

// // model is a class in which we construct doments
// const Kitten = mongoose.model('Kitten', kittySchema);

// const monkey = new Kitten({ name: 'orange'});
// monkey.save((err, monkey) => {
//     if (err){
//         return console.log(err)
//     }
//     console.log(monkey.name);
// })

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error, client) => {
    if (error){ return console.log('Unable to connect to db')}
    const db = client.db(databaseName);
    // inserts one user
    // db.collection('users').insertOne({
    //     name: 'Marlene',
    //     age: 37,
    // }, (error, result) => {
    //     if (error) { return console.log(error)}
    //     console.log(result.ops)
    // });

    // inserts multiple users
    // db.collection('users').insertMany([
    //     {
    //         name: 'Melissa',
    //         age: 41,
    //     },
    //     {
    //         name: 'Jen',
    //         age: 28,
    //     }
    // ], (error, result) => {
    //     if (error) { return console.log(error)}
    //     console.log(result.ops)
    // });

    // inserts multiple tasks
    db.collection('tasks').insertMany([
        {
            description: 'task 1',
            completed: false,
        },
        {
            description: 'task 2',
            completed: true,
        },
        {
            description: 'task 3',
            completed: false,
        }
    ], (error, result) => {
        if (error) { return console.log(error)}
        console.log(result.ops)
    });

});
