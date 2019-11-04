const express = require('express');
const router = new express.Router();

const { getMembers } = require('./get');
const { patchHouse } = require('./patch');
const { postHouse } = require('./post');

const houseApi = (models, auth) => {
    router.get('/members', getMembers(models, auth) )
    router.patch('/', patchHouse(models, auth));
    router.post('/', postHouse(models, auth));
    return router;
}


module.exports = houseApi;
