const express = require('express');
const router = new express.Router();

const { getTaskById, getTasks, getTasksByHouse } = require('./get');
const { patchTaskById } = require('./patch');
const { deleteTaskById } = require('./delete');
const { postTask } = require('./post');

const taskApi = (models, auth) => {
    router.get('/', auth, getTasks(models));
    router.get('/house', auth, getTasksByHouse(models));
    router.get('/:id', auth, getTaskById(models));
    router.delete('/:id', auth, deleteTaskById(models));
    router.patch('/:id', auth, patchTaskById(models));
    router.post('/', auth, postTask(models));
    return router;
}


module.exports = taskApi;
