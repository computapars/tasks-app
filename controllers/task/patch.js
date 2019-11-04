const patchTaskById = ({ Task, User }) => async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed', 'assignedTo'];
    const isValidUpdate = update.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "invalid update"});
    }
    try {
        const isUserValid = await User.findOne({
            _id: req.body.assignedTo,
            house: req.house,
        })
        if(!isUserValid){
            throw new Error("Can't update this task since its not yours")
        }
        const task = await Task.findOne({_id, assignedTo: req.user._id });
        // for assignign to someone else will have to have the userId of someone else?
        update.forEach((update) => task[update] = req.body[update]);
        await task.save();
        if (!task) {
            return res.status(400).send();
        }
        res.send(task);
    } catch (err) {
        res.status(400).send();
    }
};

module.exports = { patchTaskById }