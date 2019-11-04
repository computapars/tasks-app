const patchHouse = ({ House }) => async (req, res) => {
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
};

module.exports = { patchHouse };

