const getLoggedInUser = ({ User }, { config }) => async (req, res) => {
    res.send(req.user);
};

module.exports = {
    getLoggedInUser
}