const request = require('supertest');
const app = require('../app');
const House = require('../models/house');
const {
    userOne,
    houseOne,
    setupHouseDb,
} = require('./fixtures/db');

beforeEach(setupHouseDb);

test('Create a house', async () => {
    const response = await request(app)
        .post('/house')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(houseOne)
        .expect(201);
    expect(JSON.stringify(response.body.members[0]))
        .toBe(JSON.stringify(userOne._id));
})
