const getTasksByHouse = ({ Task }, { config }) => async (req, res) => {
    try {
        const tasks = await Task.find({
            house: req.house._id,
        });
        res.send(tasks);
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
};

const getTasks = ({ Task }, { config }) => async (req, res) => {
    // get/tasks/?completed=false
    // TODO: setup api with query params to return a completed vs not completed value
    // TODO: setup pagination?
    // TODO: setup captcha?
    // TODO: setup sortby
    const isCompleted = req.query.completed === 'true'
    try {
        const tasks = await Task.find({
            assignedTo: req.user._id,
            completed: isCompleted,
        });
        res.send(tasks);
    } catch (err) {
        res.status(500).send();
    }
};

// :id is a route parameter
const getTaskById = ({ Task }, { config }) => async (req, res) => {
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