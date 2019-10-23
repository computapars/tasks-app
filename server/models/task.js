const mongoose = require('mongoose');
const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
mongoose.connect(`${connectionUrl}/${databaseName}`, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
// schema
const tasksSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

// model is a class in which we construct doments
const Task = mongoose.model('Task', tasksSchema);

const brushCats = new Task({ description: 'brush cats    ',});
brushCats.save().then((err, task) => {
    if (err){
        return console.log(err)
    }
    console.log(task);
})