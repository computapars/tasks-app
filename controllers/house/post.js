const mongoose = require('mongoose');
const { inviteToHouseEmail } = require('./../../utils/mail');
const validator = require('validator');

const postHouse = ({ House }) => async (req, res) => {
    try {
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

const inviteMembers = ({ User }) => async (req, res) => {
    try {
        const { email, name, message } = req.body;
        const member = await User.findById({ 
            _id: req.user._id,
            house: req.house._id,
        }).populate('house');
        const houseName = member.house.name;
        const houseId = member.house._id;
        const referral = member.name;

        if(!validator.isEmail(email)){
            throw new Error('Email is invalid.')
        }
        if(!validator.isByteLength(message, { max: 300 })){
            throw new Error('Message lenght is too long.')
        }
        await inviteToHouseEmail({ referral, email, name, message, houseName, houseId });
        res.status(200).send({
            email,
            name,
            houseName
        });
    } catch(err){
        res.status(400).send({err});
    }
}


module.exports = { 
    postHouse,
    inviteMembers,
}
