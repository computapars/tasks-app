const postTask = ({ Task }) => async (req, res) => {
    const task = new Task({
        house: req.house,
        ...req.body,
        assignedTo: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch(err) {
        res.status(404).send(err)
    }
}; 

module.exports = { postTask };
