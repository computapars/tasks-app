const request = require('supertest');
const app = require('../app');
const {
    userOne,
    inviteOne,
    setupHouseDb,
    houseOne,
} = require('./fixtures/db');

beforeEach(setupHouseDb);

test('Create a house', async () => {
    const response = await request(app)
        .post('/house')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "Bar house"
        })
        .expect(201);
    expect(JSON.stringify(response.body.members[0]))
        .toBe(JSON.stringify(userOne._id));
});

test('Should get members of house', async () => {
    const response = await request(app)
        .get('/house/members')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(JSON.stringify(response.body[0]._id))
        .toBe(JSON.stringify(userOne._id));
});

test('Should be able to invite members', async() => {
    await request(app)
        .post('/house/members/invite')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(inviteOne)
        .expect(200)
});

test('Should be able to signup members', async() => {
    const url = `/house/members/invite?houseId=
    ${houseOne._id}&houseName=${encodeURI(houseOne.name)}&userName=${encodeURI(userOne.name)}`;
    console.log(url)
    await request(app)
        .get(url)
        .send()
        .expect(200)
});