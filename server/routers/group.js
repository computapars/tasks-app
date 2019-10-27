const express = require('express');
const router = new express.Router();
const Group = require('../models/group');

router.post('/group', async (req, res) => {
    const group = new Group(req.body);
    try {
        await group.save();
        res.status(201).send(group);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;