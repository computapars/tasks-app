
const patchLoggedInUser = () => async (req, res) => {
    const update = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidUpdate = update.every(update => allowedUpdates.includes(update));

    if(!isValidUpdate) {
        return res.status(400).send({ error: "invalid updates"});
    }
    try {
        const user = req.user;
        update.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send({
            "message" : "User not updated.",
            "success" : false,
        });
    }
};

module.exports = {
    patchLoggedInUser
}