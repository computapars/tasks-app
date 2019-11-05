const postTask = ({ Task }) => async (req, res) => {
    try {
        const isValidUser = await Task.isValidUser(req.body.assignedTo, req.house);
        if (isValidUser) {
            const task = new Task({
                house: req.house,
                ...req.body,
            });
            await task.save();
            res.status(201).send(task);
        }
    } catch(err) {
        console.log(err)
        res.status(404).send(err)
    }
}; 

module.exports = { postTask };
