const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const User = require('./models/user');
const Task = require('./models/task');

// Runs mongoose db
require('./db/mongoose');

// Sets up app to parse json
app.use(bodyParser.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/users', async (req, res) => {
    // querying the db via the User model in mongoose
    // https://mongoosejs.com/docs/queries.html
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(500).send();
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        // mongoose may return an empty user if there is none with that id
        if (!user) {
            return res.status(400).send();
        }
        res.send(user);
    } catch(err) {
        res.status(500).send()
    }
});

app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidUpdate = update.every(update => allowedUpdates.includes(update));

    if(!isValidUpdate) {
        return res.status(400).send({ error: "invalid updates"});
    }
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        if (!user) {
            return res.status(400).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send();
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch(err) {
        res.status(404).send(err)
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (err) {
        res.status(500).send();
    }
});


// :id is a route parameter
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (err) { 
        res.status(500).send();
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = update.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({ error: "invalid update"});
    }
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(400).send();
        }
        res.send(task);
    } catch (err) {
        res.status(400).send();
    }
});


app.listen(PORT, () => {
    console.log('app is running')
});