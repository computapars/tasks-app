const jwt = require('jsonwebtoken');
const User = require('../models/user');
const House = require('../models/house')

const auth = async (req, res, next) => {
    try {
        // we send tokens in our headers via key, value (Authorization, Bearer ${token})
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'somesignature');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        const house = await House.findOne({ 'members': decoded._id });

        if (!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        req.house = house;
        next();
    } catch (err){
        res.status(401).send({ error: 'Not able to authenticate'});
    }
    
}

module.exports = auth;