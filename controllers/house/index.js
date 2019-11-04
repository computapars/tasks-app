const express = require('express');
const router = new express.Router();

const { getMembers } = require('./get');
const { patchHouse } = require('./patch');
const { postHouse } = require('./post');

const houseApi = (models, auth) => {
    router.get('/members', auth, getMembers(models) )
    router.patch('/', auth, patchHouse(models));
    router.post('/', auth, postHouse(models));
    return router;
}


module.exports = houseApi;
