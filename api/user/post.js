const { welcomeEmail } = require('./../../utils/mail');

const postUser = ({ User }) => async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        welcomeEmail(user.email, user.name);
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send({
            "message" : "User added.",
            "success" : false,
        });
    }
};

const login = ({ User }) => async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token});
    } catch (err) {
        res.status(400).send({
            "message" : "User not logged out.",
            "success" : false,
        });
    }
};

const logout = () => async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(item => item.token !== req.token);
        await req.user.save();
        res.status(200).send(req.user);
    } catch (err) {
        res.status(500).send({
            "message" : "User not logged in.",
            "success" : false,
        });
    }
};


const logoutAll = () => async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(500).send({
            "message" : "User not logged in.",
            "success" : false,
        });
    }
};

module.exports = {
    postUser,
    login,
    logout,
    logoutAll
}