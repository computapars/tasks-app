const express = require('express');
const router = new express.Router();

const { getMembers, signupMembers } = require('./get');
const { patchHouseWithNewMember } = require('./patch');
const { postHouse, inviteMembers } = require('./post');

const houseApi = (models, auth) => {
    router.get('/members', auth, getMembers(models) )
    router.get('/members/invite', signupMembers(models) )
    router.post('/members/invite', auth, inviteMembers(models) )
    router.patch('/', auth, patchHouseWithNewMember(models));
    router.post('/', auth, postHouse(models));
    return router;
}


module.exports = houseApi;
