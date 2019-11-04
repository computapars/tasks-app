const getLoggedInUser = ({ User }) => async (req, res) => {
    res.send(req.user);
    // TODOD: right now it looks like when I join multiple houses, i only get the last one back
    // I can't see any of my tasks
};

module.exports = {
    getLoggedInUser
}