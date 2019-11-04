const getMembers = ({ House }) =>  async (req, res) => {
    const house = await House.findOne({ 
        members: req.user._id,
    });
    try {
        res.send(house.members)
    } catch (err) {
        res.status(400).send();
    }
}

module.exports = { getMembers };