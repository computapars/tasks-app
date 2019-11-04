const postUser = ({ User }, { config }) => async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
};

const login = ({ User }, { config }) => async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token});
    } catch (err) {
        res.status(400).send();
    }
};

const logout = ({ User }, { config }) => async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(item => item.token !== req.token);
        await req.user.save();
        res.send(req.user);
    } catch (err) {
        res.status(500).send();
    }
};


const logoutAll = ({ User }, { config }) => async (req, res) => {
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