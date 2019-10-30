const express = require('express');
const router = new express.Router();
const House = require('../models/house');
const auth = require ('../middleware/auth');

router.post('/house', auth, async (req, res) => {
    try {
        const house = new House({
            members: req.user.toObject(),
            ...req.body
        });
        req.user.house = house;
        await house.save();
        await req.user.save();
        res.status(201).send(house);
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
        req.user.house = house;
        await house.save();
        await req.user.save();
        res.status(201).send(house);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = router;