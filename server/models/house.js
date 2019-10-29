const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'why no name?'],
        trim: true,
        unique: true,
    },
    members: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    }]
});
 
houseSchema.virtual('tasks', {
    ref: 'Task',
    localField: 'owner._id',
    foreignField:'_id'
})

const House = mongoose.model('House', houseSchema);
module.exports = House;
