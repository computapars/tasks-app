const patchTaskById = ({ Task, User, House }) => async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed', 'assignedTo', 'rotate'];
    const isValidUpdate = update.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({
            "message" : "Invalid update",
            "success" : false,
        });
    }
    try {
        const task = await Task.findOne({
            _id,
            assignedTo: req.user._id
        });
        if (!task) {
            return res.status(400).send({
                "message" : "No task by this id assigned to user.",
                "success" : false,
            });
        }
        const isAHouseMember = await Task.isAHouseMember(User, req.body.assignedTo, req.house);
        if (isAHouseMember) {
            const userCompletedAutoRotate = update.includes("completed") && task.rotate;
            const assignedToUser = req.user._id == req.body.assignedTo;
            if (userCompletedAutoRotate && assignedToUser ) {
                /*  Someone is completing an auto rotate and we have to
                    assign it to the next user or start the loop over
                */
                const nextHouseMember = await Task.getNextHouseMember(House, req.user._id, req.house);
                req.body.assignedTo = nextHouseMember;
            }
            update.forEach((update) => task[update] = req.body[update]); 
            await task.save();
            res.send(task);
        }
    } catch (err) {
        res.status(400).send({
            "message" : "Cannot update task.",
            "success" : false,
        });
    }
};


module.exports = { 
    patchTaskById,
}