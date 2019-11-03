const express = require('express');
const router = express.Router();
const Task = require('./../models/task');
const auth = require('./../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
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
}); 

router.get('/tasks/house', auth, async (req, res) => {
    try {
        const tasks = await Task.find({
            house: req.house._id,
        });
        res.send(tasks);
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
});

// get/tasks/?completed=false
router.get('/tasks', auth, async (req, res) => {
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
});


// :id is a route parameter
router.get('/tasks/:id', auth, async (req, res) => {
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
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = update.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "invalid update"});
    }
    try {
        const task = await Task.findOne({_id, assignedTo: req.user._id });
        update.forEach((update) => task[update] = req.body[update]);
        await task.save();
        if (!task) {
            return res.status(400).send();
        }
        res.send(task);
    } catch (err) {
        res.status(400).send();
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete({
            _id,
            assignedTo: req.user._id,
        });
        if (!task) {
            return res.status(400).send({error: 'Task doesn\'t exist.'});
        }
        res.send(task);
    } catch(err) {
        res.status(500).send()
    }
});

module.exports = router;