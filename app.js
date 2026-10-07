const { config } = require('dotenv');
config();

const express = require('express');
const { logger } = require('./middlewares/logger');
const { taskRoutes } = require('./routes/task.routes')

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Ok',
        message: 'Server is working'
    });
});

module.exports = app;