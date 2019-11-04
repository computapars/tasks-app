const getMembers = ({ House }) =>  async (req, res) => {
    // TODO: getMembers of a house only I belong to
    // would be cool to populate the house with its members
    // so when you call this to make an option for folks to assign to
    try {
        res.send()
    } catch (err) {
        res.status(400).send();
    }
}

module.exports = { getMembers };