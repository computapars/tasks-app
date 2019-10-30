const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token});
    } catch (err) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(item => item.token !== req.token);
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(500).send();
    }
});


router.post('/users/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id);
//         // mongoose may return an empty user if there is none with that id
//         if (!user) {
//             return res.status(400).send();
//         }
//         res.send(user);
//     } catch(err) {
//         return res.status(500).send()
//     }
// });

router.patch('/users/me', auth, async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidUpdate = update.every(update => allowedUpdates.includes(update));

    if(!isValidUpdate) {
        return res.status(400).send({ error: "invalid updates"});
    }
    try {
        const user = req.user;
        update.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send();
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch(err) {
        res.status(500).send()
    }
});

module.exports = router;