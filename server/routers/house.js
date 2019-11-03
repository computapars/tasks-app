const express = require('express');
const router = new express.Router();
const House = require('../models/house');
const auth = require ('../middleware/auth');
const { inviteToHouseEmail } = require('../emails/account');

router.post('/house', auth, async (req, res) => {
    try {
        const house = new House({
            members: {
                member: {
                    ...req.user,
                },
            },
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

router.get('/house/members', auth, async (req, res) => {
    // would be cool to populate the house with its members
    // so when you call this to make an option for folks to assign to
    try {
        console.log(req.house.members)
        res.send()
    } catch (err) {
        res.status(400).send();
    }
})

// delete the house
// rename the house
// add more members to the house
router.patch('/house', auth, async (req, res) => {
    try {
        const house = await House.findOne({ name: req.body.name});
        // TODO make sure you are only adding members to a house
        // you belong to.
        house.members = house.members.concat({
            member: {
                ...req.user,
            }
        });
        req.user.house = house;
        await house.save();
        await req.user.save();
        // inviteToHouseEmail()
        res.status(201).send(house);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;