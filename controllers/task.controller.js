const { tasksDb } = require('../models/db.tasks');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await tasksDb;

        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Error getting tasks:', error);

        return res.status(500).json({
            status: 'Error',
            message: 'Failed to get tasks',
        });
    }
};


const getTaskById = async (req, res) => {
    try {
        const taskId = parseInt(req.params.taskId, 10);

        const tasks = await tasksDb;
        const task = tasks.find(t => t.id === taskId);

        if (!task) {
            return res.status(404).json({
                status: 'Error',
                message: 'Task not found',
            });
        }

        return res.status(200).json(task);

    } catch (error) {
        console.error('Error getting task:', error);

        return res.status(500).json({
            status: 'Error',
            message: 'Failed to get task',
        });
    }
};


const createTask = async (req, res) => {

    if (req.body === undefined || req.body === null) {
        return res.status(400).json({
            status: 'Error',
            message: 'Request body is missing',
        });
    }

    const { title, description, completed } = req.body;

    if (
        typeof title !== 'string' ||
        !title.trim() ||
        typeof description !== 'string' ||
        !description.trim() ||
        typeof completed !== 'boolean'
    ) {
        return res.status(400).json({
            status: 'Error',
            message:
                'title and description must be non-empty strings, and completed must be a boolean',
        });
    }

    try {
        const tasks = await tasksDb;

        const newTask = {
            id: tasks.length + 1,
            title: title.trim(),
            description: description.trim(),
            completed,
        };

        tasks.push(newTask);

        return res.status(201).json(newTask);

    } catch (error) {
        console.error('Error creating task:', error);

        return res.status(500).json({
            status: 'Error',
            message: 'Failed to create task',
        });
    }
};


const updateTaskById = async (req, res) => {

    const taskId = parseInt(req.params.taskId, 10);

    const { title, description, completed } = req.body ?? {};

    if (
        title !== undefined &&
        (typeof title !== 'string' || !title.trim())
    ) {
        return res.status(400).json({
            status: 'Error',
            message: 'Title must be a non-empty string',
        });
    }

    if (
        description !== undefined &&
        (typeof description !== 'string' || !description.trim())
    ) {
        return res.status(400).json({
            status: 'Error',
            message: 'Description must be a non-empty string',
        });
    }

    if (
        completed !== undefined &&
        typeof completed !== 'boolean'
    ) {
        return res.status(400).json({
            status: 'Error',
            message: 'Completed must be a boolean',
        });
    }

    try {
        const tasks = await tasksDb;
        const task = tasks.find(t => t.id === taskId);

        if (!task) {
            return res.status(404).json({
                status: 'Error',
                message: 'Task not found',
            });
        }

        if (title !== undefined) {
            task.title = title.trim();
        }

        if (description !== undefined) {
            task.description = description.trim();
        }

        if (completed !== undefined) {
            task.completed = completed;
        }

        return res.status(200).json(task);

    } catch (error) {
        console.error('Error updating task:', error);

        return res.status(500).json({
            status: 'Error',
            message: 'Failed to update task',
        });
    }
};


const deleteTaskById = async (req, res) => {
    try {
        const taskId = parseInt(req.params.taskId, 10);

        const tasks = await tasksDb;
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return res.status(404).json({
                status: 'Error',
                message: 'Task not found',
            });
        }

        tasks.splice(taskIndex, 1);

        return res.status(200).json({
            status: 'Ok',
            message: 'Task deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting task:', error);

        return res.status(500).json({
            status: 'Error',
            message: 'Failed to delete task',
        });
    }
};


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById,
};