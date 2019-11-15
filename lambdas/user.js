const express = require('express');
const userApi = require('../api/user');

// set up db connection
require('./../db/mongoose');
const app = express();

// no need to route only /book requests; that's done in now.json
const routersInit = () => {
    const router = express();
    router.use(bodyParser.json())
    router.use('/users', userApi(models, auth));
    return router;
}

module.exports = routersInit;

// just export the app instead of starting up the server
module.exports = app;