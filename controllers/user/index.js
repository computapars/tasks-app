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
    router.post('/', postUser(models));
    router.post('/login', login(models));
    router.post('/logout', auth, logout(models));
    router.post('/logout-all', auth, logoutAll(models));
    
    router.get('/me', auth, getLoggedInUser(models));
    router.patch('/me', auth, patchLoggedInUser(models));
    router.delete('/me', auth, deleteLoggedInUser(models));
    return router;
}


module.exports = userApi;