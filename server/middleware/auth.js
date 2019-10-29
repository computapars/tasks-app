const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        // we send tokens in our headers via key, value (Authorization, Bearer ${token})
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'somesignature');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err){
        res.status(401).send({ error: 'Not able to authenticate'});
    }
    
}

module.exports = auth;