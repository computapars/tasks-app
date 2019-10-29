const mongoose = require('mongoose');
// when you save a task you have to get the group you are
// in and it will save as owner
const tasksSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});


const Task = mongoose.model('Task', tasksSchema)
module.exports = Task;
