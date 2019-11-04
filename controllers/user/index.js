const express = require('express');
const router = new express.Router();

const { getLoggedInUser } = require('./get');
const { patchLoggedInUser } = require('./patch');
const { deleteLoggedInUser } = require('./delete');
const {
    postUser,
    login,
    logout,
    logoutAll
} = require('./post');


const userApi = (models, auth) => {
    router.post('/', postUser(models, auth));
    router.post('/login', login(models, auth));
    router.post('/logout', logout(models, auth));
    router.post('/logout-all', logoutAll(models, auth));
    
    router.get('/me', getLoggedInUser(models, auth));
    router.patch('/me', patchLoggedInUser(models, auth));
    router.delete('/me', deleteLoggedInUser(models, auth));
    return router;
}


module.exports = userApi;