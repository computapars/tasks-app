const patchTaskById = ({ Task, User }) => async (req, res) => {
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
        if (update.includes("assignedTo")) {
            await Task.isValidUser(User, req.body.assignedTo, req.house);
        } else if (update.includes("completed") && task.rotate) {
            // someone is completing an auto rotate and we have to assign it to the next user
        }
        update.forEach((update) => task[update] = req.body[update]); 
        await task.save();
        res.send(task);
    } catch (err) {
        res.status(400).send({error: "Cannot update task"});
    }
};

// const completeTask = ({ Task, User }) => async (req, res) => {
//     const _id = req.params.id;
//     const update = Object.keys(req.body);
//     const allowedUpdates = ['description', 'completed', 'assignedTo'];
//     const isValidUpdate = update.every(update => allowedUpdates.includes(update));
//     if (!isValidUpdate) {
//         return res.status(400).send({ error: "invalid update"});
//     }
//     try {
//         const task = await Task.findOne({_id, assignedTo: req.user._id });
//         await Task.isValidUser(User, req.body.assignedTo, req.house);

//         update.forEach((update) => task[update] = req.body[update]);
//         await task.save();
//         if (!task) {
//             return res.status(400).send();
//         }
//         res.send(task);
//     } catch (err) {
//         console.log(err)
//         res.status(400).send({error: err});
//     }
// };

module.exports = { 
    patchTaskById,
    // completeTask,
}