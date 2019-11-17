const request = require('supertest');
const app = require('./../../app');
const User = require('../models/user');

const {
    userOne,
    setupUserDb
} = require('./fixtures/db');

beforeEach(setupUserDb);

test('Signup new user', async () => {
    const response = await request(app)
            .post('/api/users')
            .send({
                name: 'Marlene',
                email: 'marlenebowles@gmail.com',
                password: 'marlenes'
            })
            .expect(201);
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({
        user: {
            name: 'Marlene',
            email: 'marlenebowles@gmail.com',
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('marlenes');
});

test('Should not login nonexistant user', async () => {
    await request(app).post('/api/users/login')
            .send({
                email: userOne.email,
                password: 'barbarbar'
            })
            .expect(400);
});

test('Should login existing user', async () => {
    const response = await request(app).post('/api/users/login')
            .send(userOne)
            .expect(200);
    const user = await User.findById(userOne._id);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not get profile for unathenticated user', async () => {
    await request(app)
        .get('/api/users/me')
        .send()
        .expect(401);
});

test('Should get profile for user', async () => {
    await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
});

test('Should delete user', async () => {
    const response = await request(app)
            .delete('/api/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200);
    const user = await User.findById(response._id);
    expect(user).toBeNull();
});

test('Should not delete unathenticated user', async () => {
    await request(app)
            .delete('/api/users/me')
            .send()
            .expect(401);
});

test('Should update valid user fields', async () => {
    const response = await request(app)
            .patch('/api/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                name: "Bar"
            }).expect(200)
    const user = await User.findById(response.body._id);
    expect(user.name).toBe("Bar")
});

test('Should not update invalid user fields', async () => {
    await request(app)
            .patch('/api/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                location: '',
            }).expect(400);
});

test('Should not update unathenticated user', async () => {
    await request(app)
            .patch('/api/users/me')
            .send()
            .expect(401);
});