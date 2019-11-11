const request = require('supertest');
const app = require('../app');

test('Signup new use', async () => {
    await request(app).post('/users').send({
        name: 'Marlene',
        email: 'marlenebowles@gmail.com',
        password: 'marlenes'
    }).expect(201);
});