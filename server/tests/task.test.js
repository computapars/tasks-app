const request = require('supertest');
const app = require('./../../app');
const {
    userOne,
    userTwo,
    userThree,
    taskOne,
    taskTwo,
    setupTaskDb,
} = require('./fixtures/db');

beforeEach( async () => {
    await setupTaskDb();
})

test('Should create a new task', async () => {
    request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(taskOne)
        .expect(201);
});

test('Should not create a new task if member isn\'t part of a house', async () => {
    await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
        .send(taskOne)
        .expect(401);
});

test('Should update task', async () => {
    const task = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(taskOne)
        .expect(201);
    const update = await request(app)
        .patch(`/api/tasks/${task.body._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            ...taskOne,
            description: "Egg Task",
        })
        expect(update.body.description).toBe("Egg Task");
});

test('Should assign task to other member', async () => {
    const task = await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send(taskOne)
    .expect(201);
    const update = await request(app)
        .patch(`/api/tasks/${task.body._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            ...taskOne,
            assignedTo: userTwo._id,
        })
        expect(JSON.stringify(update.body.assignedTo))
        .toBe(JSON.stringify(userTwo._id));
});

test('Should rotate task to next member in house', async () => {
    const task = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            ...taskOne,
            rotate: true,
        })
        .expect(201);
    const update = await request(app)
        .patch(`/api/tasks/${task.body._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed: true,
            assignedTo: userOne._id,
        })
        .expect(200)
        expect(JSON.stringify(update.body.assignedTo))
        .toBe(JSON.stringify(userTwo._id));
});

test('Should get tasks assigned to house', async () => {
    await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(taskOne)
        .expect(201);
    await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(taskTwo)
        .expect(201);
    const tasksByHouse = await request(app)
        .get('/api/tasks/house')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);   
        expect(tasksByHouse.body.length).toBe(2);
});

test('Should not get tasks if user is not a member of the house', async () => {
    await request(app)
        .get('/api/tasks/house')
        .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
        .send()
        .expect(401);   
});

test('Should get uncompleted tasks assigned to user', async () => {
    await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(taskOne);
    const incompleteTasks = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    expect(incompleteTasks.body.length).toBe(1);
});

test('Should only get completed tasks assigned to user', async () => {
    await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            ...taskOne,
            completed: true,
        });
    const incompleteTasks = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
    expect(incompleteTasks.body.length).toBe(0);
});


test('Should not get tasks assigned to other users', async () => {
    await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "Spam Task",
            completed: true,
            rotate: false,
            assignedTo: userOne._id,
        });
    const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200);
    expect(response.body.length).toBe(0)
});

test('Should get task by id', async () => {
    const task = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "Spam Task",
            completed: true,
            rotate: false,
            assignedTo: userOne._id,
        });
    await request(app)
        .get(`/api/tasks/${task.body._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get task by id if there is malformed id', async () => {
    const task = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "Spam Task",
            completed: true,
            rotate: false,
            assignedTo: userOne._id,
        });
    await request(app)
        .get(`/api/tasks/${task.body._id}foo`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(400);
});

test('Should allow user to delete task', async () => {
    const task = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "Spam Task",
            completed: true,
            rotate: false,
            assignedTo: userOne._id,
        });
    await request(app)
        .delete(`/api/tasks/${task.body._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not allow user to delete someone else\'s task', async () => {
    const task = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "Spam Task",
            completed: true,
            rotate: false,
            assignedTo: userOne._id,
        });
    await request(app)
        .delete(`/api/tasks/${task.body._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(400);
});
