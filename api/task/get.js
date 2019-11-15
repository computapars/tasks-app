const getTasksByHouse = ({ Task }) => async (req, res) => {
    try {
        const tasks = await Task.find({
            house: req.house._id,
        }).populate('assignedTo');
        res.send(tasks);
    } catch (err) {
        res.status(400).send({
            "message" : "Can not return tasks.",
            "success" : false,
        });
    }
};

const getTasks = ({ Task }) => async (req, res) => {
    const isCompleted = req.query.completed === 'true'
    try {
        const tasks = await Task.find({
            assignedTo: req.user._id,
            completed: isCompleted,
        }).populate('assignedTo').populate('house');
        res.send(tasks);
    } catch (err) {
        res.status(400).send({
            "message" : "Cannot return tasks.",
            "success" : false,
        });
    }
};

const getTaskById = ({ Task }) => async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({
            _id, 
            assignedTo: req.user._id,
        });
        if (!task) {
            return res.status(404).send({
                "message" : "No Task with this id assigned to user.",
                "success" : false,
            });
        }
        res.send(task);
    } catch (err) { 
        res.status(400).send({
            "message" : "Cannot get task.",
            "success" : false,
        });
    }
};

module.exports = {
    getTasksByHouse,
    getTaskById,
    getTasks
}