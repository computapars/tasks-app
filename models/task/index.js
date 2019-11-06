const mongoose = require('mongoose');
const { schema } = require('./schema');

// when you save a task you have to get the group you are
// in and it will save as owner

const Task = mongoose.model('Task', schema)
module.exports = Task;
