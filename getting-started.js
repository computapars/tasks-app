const { MongoClient, ObjectID } = require('mongodb');
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const id = new ObjectID();
MongoClient.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error, client) => {
    if (error){ return console.log('Unable to connect to db')}
    const db = client.db(databaseName);
    
    // inserts multiple tasks
    // db.collection('tasks').insertMany([
    //     {
    //         description: 'task 1',
    //         completed: false,
    //     },
    //     {
    //         description: 'task 2',
    //         completed: true,
    //     },
    //     {
    //         description: 'last task',
    //         completed: false,
    //         _id: id,
    //     }
    // ], (error, result) => {
    //     if (error) { return console.log(error)}
    // });
    // db.collection('tasks').updateMany({
    //     completed: true,
    // }, {
    //     $set: {
    //     completed: false
    // }}).then(results => {
    //    console.log(results)
    // })
    db.collection('tasks').deleteMany({
        description: 'task 1',
    }).then(results => console.log(results.deletedCount))
});


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