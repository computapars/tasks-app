const postTask = ({ Task, User }) => async (req, res) => {
    try {
       await Task.isAHouseMember(User, req.body.assignedTo, req.house);
        const task = new Task({
            house: req.house,
            ...req.body,
        });
        await task.save();
        res.status(201).send(task);
    } catch(err) {
        res.status(404).send({error: "Can't save task."})
    }
}; 

module.exports = { postTask };
