const deleteTaskById = ({ Task }) => async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({
            _id,
            assignedTo: req.user._id,
        });
        if (!task) {
            return res.status(400).send({
                "message" : "Task does not exist.",
                "success" : false,
            });
        }
        res.send(task);
    } catch(err) {
        res.status(400).send({
            "message" : "Task was not deleted.",
            "success" : false,
        })
    }
};

module.exports = {
    deleteTaskById
}