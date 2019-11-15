const express = require('express');
const auth = require ('../middleware/auth');
const bodyParser = require('body-parser');

// Controllers
const userApi = require('./user');
const taskApi = require('./task');
const houseApi = require('./house');

// Models
const House = require('../models/house');
const User = require('../models/user');
const Task = require('../models/task');

const models = {
    House,
    User,
    Task
};

const routersInit = () => {
    const router = express();
    router.use(bodyParser.json())
    router.use('/users', userApi(models, auth));
    router.use('/tasks', taskApi(models, auth));
    router.use('/house', houseApi(models, auth));
    return router;
}

module.exports = routersInit;