const mongoose = require('mongoose');
const { inviteToHouseEmail } = require('./../../utils/mail');
const validator = require('validator');

const postHouse = ({ House }) => async (req, res) => {
    if (req.user.house) {	
        // pre-existing house	
        return res.status(400).send({
            "message" : "Users are only allowed to belong to one house.",
            "success" : false,
        });
    }
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
        res.status(400).send({
            "message" : "House was not created.",
            "success" : false,
        });
    }
};

const inviteMembersToHouse = ({ User }) => async (req, res) => {
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
            return res.status(400).send({
                "message" : "Email is not valid.",
                "success" : false,
            });
        }
        if(!validator.isByteLength(message, { max: 300 })){
            return res.status(400).send({
                "message" : "Message is too long.",
                "success" : false,
            });
        }
        await inviteToHouseEmail({ referral, email, name, message, houseName, houseId });
        res.status(200).send({
            email,
            name,
            houseName
        });
    } catch(err){
        res.status(400).send({
            "message" : "Member not invited",
            "success" : false,
        });
    }
}


module.exports = { 
    postHouse,
    inviteMembersToHouse,
}
