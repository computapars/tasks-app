const getTasksByHouse = ({ Task }) => async (req, res) => {
    try {
        const tasks = await Task.find({
            house: req.house._id,
        }).populate('assignedTo');
        res.send(tasks);
    } catch (err) {
        res.status(500).send();
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
        res.status(500).send();
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
            return res.status(404).send();
        }
        res.send(task);
    } catch (err) { 
        res.status(500).send();
    }
};

module.exports = {
    getTasksByHouse,
    getTaskById,
    getTasks
}