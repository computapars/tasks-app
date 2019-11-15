const deleteLoggedInUser = () => async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch(err) {
        res.status(500).send({
            "message" : "Cannot remove user.",
            "success" : false,
        })
    }
};

module.exports = {
    deleteLoggedInUser,
}