const express = require('express');
const taskApi = require('../api/task');

// set up db connection
require('./../db/mongoose');
const app = express();

const routersInit = () => {
    const router = express();
    router.use(bodyParser.json())
    router.use('/tasks', taskApi(models, auth));
    return router;
}

module.exports = routersInit;

// just export the app instead of starting up the server
module.exports = app;