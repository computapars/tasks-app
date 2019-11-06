const mongoose = require('mongoose');

const postHouse = ({ House }) =>  async (req, res) => {
    try {
        if (req.user.house) {
            // pre-existing house
            throw new Error("Already have a house")
        }
        const house = new House({
            _id: new mongoose.mongo.ObjectId(),
            members: {
                ...req.user,
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
};

module.exports = { postHouse }
