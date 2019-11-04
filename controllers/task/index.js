const express = require('express');
const router = new express.Router();

const { getTaskById, getTasks, getTasksByHouse } = require('./get');
const { patchTaskById } = require('./patch');
const { deleteTaskById } = require('./delete');
const { postTask } = require('./post');

const taskApi = (models, auth) => {
    router.get('/', getTasks(models, auth));
    router.get('/house', getTasksByHouse(models, auth));
    router.get('/:id', getTaskById(models, auth));
    router.delete('/:id', deleteTaskById(models, auth));
    router.patch('/:id', patchTaskById(models, auth));
    router.post('/', postTask(models, auth));
    return router;
}


module.exports = taskApi;
