const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const House = require('../models/house');
const auth = require ('../middleware/auth');
const User = require('../models/user');

router.post('/house', auth, async (req, res) => {
    try {
        const house = new House({
            _id: new mongoose.Types.ObjectId(), 
            ...req.body,
            members: req.user.toObject(),
        });
        await house.save();
        req.user.house = house._id;
        await req.user.save();
        res.status(201).send(house);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/house', auth, async (req, res) => {
    try {
        const user = await User.
            findById(req.user._id).
            populate('house');
        res.status(200).send(user.house.name);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete the house
// rename the house
// add more members to the house
router.patch('/house', auth, async (req, res) => {
    try {
        const house = await House.findOne({ name: req.body.name});
        house.members = house.members.concat(req.user.toObject());
        req.user.house = house._id;
        await house.save();
        await req.user.save();
        res.status(201).send(house);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;