const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/users', async (req, res) => {
    // querying the db via the User model in mongoose
    // https://mongoosejs.com/docs/queries.html
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(500).send();
    }
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(400).send({ error: 'User doesn\'t exist'});
        }
        res.send(user);
    } catch(err) {
        res.status(500).send()
    }
});

module.exports = router;