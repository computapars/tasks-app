const deleteLoggedInUser = ({ User }) => async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch(err) {
        res.status(500).send()
    }
};

module.exports = {
    deleteLoggedInUser,
}