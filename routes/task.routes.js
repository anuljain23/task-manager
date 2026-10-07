const express = require('express');
const { createTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById } = require('../controllers/task.controller');
const router = express.Router();


// get all tasks
router.get('/', getAllTasks);

// get task by id
router.get('/:taskId', getTaskById)

// create new task route
router.post('/', createTask);

// update task by id
router.put('/:taskId', updateTaskById);

// delete task by id
router.delete('/:taskId', deleteTaskById);

module.exports = {
    taskRoutes: router,
};