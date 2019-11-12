const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: "Foo",
    email: "foo@example.com",
    password: "foofoofoo",
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
    }]
};

beforeEach(async() => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Signup new user', async () => {
    await request(app)
            .post('/users')
            .send({
                name: 'Marlene',
                email: 'marlenebowles@gmail.com',
                password: 'marlenes'
            })
            .expect(201)
});

test('Should not login nonexistant user', async () => {
    await request(app).post('/users/login')
            .send({
                email: userOne.email,
                password: 'barbarbar'
            })
            .expect(400)
});

test('Should login existing user', async () => {
    await request(app).post('/users/login')
            .send(userOne)
            .expect(200)
});

test('Should get profile for user', async () => {
    await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}` )
            .send()
            .expect(200)
});

test('Should delete user', async () => {
    await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}` )
            .send()
            .expect(200)
});

test('Should not delete unathenticated user', async () => {
    await request(app)
            .delete('/users/me')
            .send()
            .expect(401)
});

test('Should not get profile for unathenticated user', async () => {
    await request(app)
            .get('/users/me')
            .send()
            .expect(401)
});
