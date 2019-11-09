const mongoose = require('mongoose');

const patchTaskById = ({ Task, User, House }) => async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed', 'assignedTo'];
    const isValidUpdate = update.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "invalid update"});
    }
    try {
        const task = await Task.findOne({
            _id,
            assignedTo: req.user._id
        });
        if (!task) {
            return res.status(400).send();
        }
        const isValidUser = await Task.isValidUser(User, req.body.assignedTo, req.house);
        if (isValidUser) {
            if (update.includes("completed") && task.rotate) {
                // someone is completing an auto rotate and we have to assign it to the next user
                const nextHouseMember = await Task.getNextHouseMember(House, req.user._id, req.house);
                req.body.assignedTo = nextHouseMember;
            }
            update.forEach((update) => task[update] = req.body[update]); 
            await task.save();
            res.send(task);
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({error: "Cannot update task"});
    }
};


module.exports = { 
    patchTaskById,
    // completeTask,
}