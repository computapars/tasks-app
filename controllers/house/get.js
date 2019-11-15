const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const getHouseMembers = ({ House }) =>  async (req, res) => {
    try {
        const house = await House.findOne({ 
            members: req.user._id,
        }).populate('members');
        res.send(house.members)
    } catch (err) {
        res.status(400).send({
            "message" : "No house found with you as a member",
            "success" : false,
        });
    }
}

const signupHouseMembers = ({ House }) =>  async (req, res) => {
    const { houseId, houseName, userName } = req.query;
    try {
        const _id = new objectId(houseId.trim())
        await House.findOne({ 
            _id, 
        })
        res.send({ houseName, userName})
    } catch (err) {
        res.status(400).send({
            "message" : "No members could be invited.",
            "success" : false,
        });
    }
}


module.exports = {
    getHouseMembers,
    signupHouseMembers
};