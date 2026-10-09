const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

server.on('error', (error) => {
    console.error('Failed to start server:', error);
    process.exitCode = 1;
});