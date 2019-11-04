const postTask = ({ Task, User }) => async (req, res) => {
    try {
        const isValidUser = await User.findOne({
            _id: req.body.assignedTo,
            house: req.house,
        });
        if (!isValidUser){
            return res.status(400).send({ error: "invalid update"});
        }
        const task = new Task({
            house: req.house,
            ...req.body,
        });
        await task.save();
        res.status(201).send(task);
    } catch(err) {
        res.status(404).send(err)
    }
}; 

module.exports = { postTask };
