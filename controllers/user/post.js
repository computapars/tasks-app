const { welcomeEmail } = require('./../../utils/mail');

const postUser = ({ User }) => async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        welcomeEmail(user.email, user.name);
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
};

const login = ({ User }) => async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token});
    } catch (err) {
        res.status(400).send();
    }
};

const logout = ({ User }) => async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(item => item.token !== req.token);
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(500).send();
    }
};


const logoutAll = ({ User }) => async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(500).send();
    }
};

module.exports = {
    postUser,
    login,
    logout,
    logoutAll
}