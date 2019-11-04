const postHouse = ({ House }, auth) => async (req, res) => {
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
        console.log(err)
        res.status(400).send(err);
    }
};

module.exports = { postHouse}