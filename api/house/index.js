const express = require('express');
const router = new express.Router();

const { getHouseMembers, signupHouseMembers } = require('./get');
const { patchHouseWithNewMember } = require('./patch');
const { postHouse, inviteMembersToHouse } = require('./post');

const houseApi = (models, auth) => {
    router.get('/members', auth, getHouseMembers(models) )
    router.get('/members/invite', signupHouseMembers(models) )
    router.post('/', auth, postHouse(models));
    router.post('/members/invite', auth, inviteMembersToHouse(models) )
    router.patch('/', auth, patchHouseWithNewMember(models));
    return router;
}


module.exports = houseApi;
