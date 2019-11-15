const getLoggedInUser = () => async (req, res) => {
    res.send(req.user);
};

module.exports = {
    getLoggedInUser
}