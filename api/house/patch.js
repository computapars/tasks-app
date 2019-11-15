const patchHouseWithNewMember = ({ House }) => async (req, res) => {
    try {
        const house = await House.findOne({ 
            name: req.body.name,
        });
        house.members = house.members.concat(req.user._id);
        req.user.house = house;
        await house.save();
        await req.user.save();
        res.status(201).send(house);
    } catch (err) {
        res.status(400).send({
            "message" : "Cannot update this house with new members.",
            "success" : false,
        });
    }
};

module.exports = { patchHouseWithNewMember };

