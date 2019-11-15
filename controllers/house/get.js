const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;
const getMembers = ({ House }) =>  async (req, res) => {
    const house = await House.findOne({ 
        members: req.user._id,
    }).populate('members');
    try {
        res.send(house.members)
    } catch (err) {
        console.log(err)
        res.status(400).send();
    }
}

const signupMembers = ({ House }) =>  async (req, res) => {
    const { houseId, houseName, userName } = req.query;
    try {
        const _id = new objectId(houseId.trim())
        await House.findOne({ 
            _id, 
        })
        res.send({ houseName, userName})
    } catch (err) {
        res.status(400).send({error : 'No House'});
    }
}


module.exports = {
    getMembers,
    signupMembers
};