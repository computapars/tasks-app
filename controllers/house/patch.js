const patchHouse = ({ House }) => async (req, res) => {
    try {
        // This needs some work
        // if im a user to wants to add a member to my house and invite them
        // i send them an email with the houseId
        // this patch would happen when a user clicks on the link?
        const house = await House.findOne({ 
            name: req.body.name,
        });
        house.members = house.members.concat(req.user._id);
        req.user.house = house;
        await house.save();
        await req.user.save();
        // inviteToHouseEmail()
        res.status(201).send(house);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
};

module.exports = { patchHouse };

